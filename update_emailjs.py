import os

script_tag = '    <!-- EmailJS SDK (Loaded in Head for priority) -->\n    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>\n'
target_line = '<link rel="stylesheet" href="css/style.css">'

for filename in os.listdir('.'):
    if filename.endswith('.html'):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'emailjs' not in content:
            print(f'Updating {filename}...')
            new_content = content.replace(target_line, target_line + '\n' + script_tag)
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
        else:
            print(f'Skipping {filename} (already has EmailJS or broken head)')
