import os

folder = r"c:\Users\AE\OneDrive\Desktop\redesign"
files_to_fix = ["services.html", "products.html", "gallery.html", "index.html"]

for f in files_to_fix:
    path = os.path.join(folder, f)
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as file:
            content = file.read()
        
        # Replace literal backslash followed by backtick with just backtick
        content = content.replace(r"\`", r"`")
        # Replace literal backslash followed by dollar sign with just dollar sign
        content = content.replace(r"\$", r"$")
        
        with open(path, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"Fixed {f}")
