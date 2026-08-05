import glob
import re

for filepath in glob.glob('components/*.tsx'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace ease: "easeOut" with ease: "easeOut" as const, etc.
    new_content = re.sub(r'ease:\s*(["\'][a-zA-Z]+["\'])(?!\s*as\s+const)', r'ease: \1 as const', content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {filepath}')
