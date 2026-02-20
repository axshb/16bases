import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

import { neon } from '@neondatabase/serverless';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
app.use(express.json());
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */


/**
* Custom API Endpoints
**/

// for testing
app.get('/api/scheme-data', async (_req, res) => {
  try {
    const sql = neon(process.env['DATABASE_URL']!);

    const data = await sql`
      SELECT * FROM "themes"
      ORDER BY "created_at" DESC
    `;

    res.json(data);
  } catch (err: any) {
      console.error('NeonDB Error');
      console.error(err.message);
      console.error(err.stack);
      res.status(500).json({ error: err.message });
    }
});

// upload theme
app.post('/api/scheme-data', async (req, res) => {
  try {
    console.log(req.body.name);
    const { name, creator, colors, dark, builtIn } = req.body;

    if (!name || !colors) {
      return res.status(400).json({ error: 'Title and colors are required' });
    }

    const sql = neon(process.env['DATABASE_URL']!);

    const result = await sql`
      INSERT INTO "themes" (name, creator, colors, created_at, dark, builtIn)
      VALUES (${name}, ${creator}, ${JSON.stringify(colors)}, NOW(), ${dark}, ${builtIn})
      RETURNING *
    `;

    return res.status(201).json(result[0]);
  } catch (err: any) {
    console.error('Database Insertion Error:', err.message);
    return res.status(500).json({ error: 'Failed to save theme' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

