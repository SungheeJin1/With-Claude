"""논문 좀비 앱을 HTML 파일 하나로 묶어요 (claude.ai 아티팩트용).

사용법: python3 grad-zombie/build-artifact.py <출력 파일 경로>
CSS·JS·글꼴을 파일 안에 넣고, 웹앱 전용 파일(manifest, 서비스 워커)은 뺍니다.
아티팩트에서는 API 키 없이 내장 Claude(sample)와 계정별 저장소(db)를 씁니다.
"""
import base64, pathlib, re, sys

root = pathlib.Path(__file__).resolve().parent
out = pathlib.Path(sys.argv[1])
html = (root / 'index.html').read_text(encoding='utf-8')

font = base64.b64encode((root.parent / 'fonts/PretendardVariable.woff2').read_bytes()).decode()
css = (root / 'css/style.css').read_text(encoding='utf-8').replace(
    'url("../../fonts/PretendardVariable.woff2")', f'url("data:font/woff2;base64,{font}")')

body = re.search(r'<body>(.*)</body>', html, re.S).group(1)
def inline(m):
    src = m.group(1)
    if src.endswith('pwa.js'):
        return ''
    return '<script>\n' + (root / src).read_text(encoding='utf-8') + '\n</script>'
body = re.sub(r'<script src="([^"]+)"></script>', inline, body)

out.write_text(
    '<title>논문 좀비</title>\n'
    '<meta name="description" content="대학원 준비를 안 하면 좀비가 쫓아와요. 논문 전문 해석·키워드·요약까지.">\n'
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap">\n'
    f'<style>\n{css}\n</style>\n{body}', encoding='utf-8')
print(out, f'{out.stat().st_size / 1e6:.1f} MB')
