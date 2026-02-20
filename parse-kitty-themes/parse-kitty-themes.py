import re
import os
import json
import hashlib

def get_luminance(hex_color):
    """Calculates relative luminance of a hex color."""
    hex_color = hex_color.lstrip('#')
    if len(hex_color) == 3:
        hex_color = ''.join([c*2 for c in hex_color])

    r, g, b = [int(hex_color[i:i+2], 16) / 255.0 for i in (0, 2, 4)]

    # srgb gamma correction
    def adjust(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    return 0.2126 * adjust(r) + 0.7152 * adjust(g) + 0.0722 * adjust(b)

def parse_kitty_theme(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # get key and hex, ignore extra whitespace/tabs
    pattern = re.compile(r'^([a-z0-9_]+)\s+(#[0-9a-fA-F]{3,6})', re.MULTILINE)
    raw_data = dict(pattern.findall(content))

    if not raw_data:
        return None

    scheme = {
        "base00": raw_data.get('background', '#000000'),
        "base01": raw_data.get('inactive_tab_background', raw_data.get('color0', '#1a1a1a')),
        "base02": raw_data.get('selection_background', '#44475a'),
        "base03": raw_data.get('color8', '#545454'),
        "base04": raw_data.get('color7', '#bbbbbb'),
        "base05": raw_data.get('foreground', '#ffffff'),
        "base06": raw_data.get('color15', '#ffffff'),
        "base07": raw_data.get('cursor', '#ffffff'),
        "base08": raw_data.get('color1', '#ff5555'),
        "base09": raw_data.get('color9', '#ffb86c'),
        "base0A": raw_data.get('color3', '#f1fa8c'),
        "base0B": raw_data.get('color2', '#50fa7b'),
        "base0C": raw_data.get('color6', '#8be9fd'),
        "base0D": raw_data.get('color4', '#bd93f9'),
        "base0E": raw_data.get('color5', '#ff79c6'),
        "base0F": raw_data.get('color13', '#ff79c6'),
    }

    # dark/light based on background luminance
    is_dark = get_luminance(scheme["base00"]) < 0.5
    name_stub = os.path.basename(file_path).replace('.conf', '')
    unique_id = hashlib.md5(name_stub.encode()).hexdigest()[:8]

    return {
        "id": unique_id,
        "name": name_stub.replace('-', ' ').replace('_', ' ').title(),
        "colors": scheme,
        "dark": is_dark,
        "builtin": True
    }

themes_dir = '../kitty-themes/themes'
processed_data = []
if os.path.exists(themes_dir):
    for filename in os.listdir(themes_dir):
        if filename.endswith(".conf"):
            theme = parse_kitty_theme(os.path.join(themes_dir, filename))
            if theme:
                processed_data.append(theme)

    with open('../public/themes_seed.json', 'w') as f:
        json.dump(processed_data, f, indent=2)

    print(f"Success: {len(processed_data)} themes processed with luminance detection.")
