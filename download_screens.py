import json
import urllib.request
import os

input_file = '/Users/putta/.gemini/antigravity/brain/3a77505a-1988-4461-9891-285c7cc92957/.system_generated/steps/15/output.txt'
output_dir = '/Users/putta/.gemini/antigravity/scratch/smart-family-pantry/screens'

os.makedirs(output_dir, exist_ok=True)

with open(input_file, 'r') as f:
    data = json.load(f)

for screen in data['screens']:
    title = screen.get('title', 'Untitled').replace(':', '').replace(' ', '_')
    html_code = screen.get('htmlCode', {})
    url = html_code.get('downloadUrl')
    
    if url:
        print(f"Downloading {title}...")
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                html = response.read().decode('utf-8')
                with open(os.path.join(output_dir, f"{title}.html"), 'w') as out_f:
                    out_f.write(html)
        except Exception as e:
            print(f"Failed to download {title}: {e}")
            
print("Done.")
