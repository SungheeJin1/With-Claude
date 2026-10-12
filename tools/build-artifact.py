"""사이트를 파일 하나(HTML)로 묶어요. claude.ai 아티팩트로 올릴 때 사용합니다.

사용법: python3 tools/build-artifact.py <출력 파일 경로>
CSS·JS·글꼴을 모두 파일 안에 넣고, 웹앱 전용 파일(manifest, 서비스 워커)은 뺍니다.
"""
import base64, pathlib, re, sys

root = pathlib.Path(__file__).resolve().parent.parent
out = pathlib.Path(sys.argv[1])
html = (root / 'index.html').read_text(encoding='utf-8')

font = base64.b64encode((root / 'fonts/PretendardVariable.woff2').read_bytes()).decode()
css = (root / 'css/style.css').read_text(encoding='utf-8').replace(
    'url("../fonts/PretendardVariable.woff2")', f'url("data:font/woff2;base64,{font}")')

body = re.search(r'<body>(.*)</body>', html, re.S).group(1)
def inline(m):
    src = m.group(1)
    if src.endswith('pwa.js'):
        return ''
    return '<script>\n' + (root / src).read_text(encoding='utf-8') + '\n</script>'
body = re.sub(r'<script src="([^"]+)"></script>', inline, body)

out.write_text(
    '<title>품사 탐험대</title>\n'
    '<meta name="description" content="초등학생도 이해하는 영어 8품사 문법 설명과 웹툰">\n'
    f'<style>\n{css}\n</style>\n{body}', encoding='utf-8')
print(out, f'{out.stat().st_size / 1e6:.1f} MB')
