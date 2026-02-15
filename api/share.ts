import { HttpResponse } from '@angular/common/http';

export async function GET() {
  const mockData = [
    { id: '1', name: 'Test Scheme', theme_type: 'dark', builtin: true }
  ];

  return Response.json(mockData);
}
