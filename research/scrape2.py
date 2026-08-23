import re,html,subprocess,json,concurrent.futures as cf
cats=json.load(open('cats.json',encoding='utf-8'))
def fetch(url):
    return subprocess.run(['curl','-sL','-A','Mozilla/5.0','--compressed','--max-time','40',url],capture_output=True).stdout.decode('utf-8','ignore')
def parse(s):
    items=[]
    blocks=re.split(r'<div class="item__info">',s)[1:]
    for blk in blocks:
        blk=blk[:blk.find('<!-- 카운팅 -->') if '<!-- 카운팅 -->' in blk else 6000]
        b=re.search(r'brand__real">(.*?)</span>',blk)
        t=re.search(r'info__title">(.*?)</h3>',blk,flags=re.S)
        p=re.search(r'data-price="(\d*)" data-custom-price="(\d*)" data-sale-price="([^"]*)"',blk)
        rv=re.search(r'review_cnt[\s\S]{0,400}?item__value"><span[^>]*>([\d,]+)</span>',blk)
        sale=None
        if p and p.group(3):
            m=re.sub(r'[^\d]','',p.group(3))
            sale=int(m) if m else None
        items.append({
            'brand': html.unescape(b.group(1)).strip() if b else '',
            'title': html.unescape(re.sub('<[^>]+>','',t.group(1))).strip() if t else '',
            'price': int(p.group(1)) if p and p.group(1) else None,
            'orig': int(p.group(2)) if p and p.group(2) else None,
            'sale': sale,
            'review': int(rv.group(1).replace(',','')) if rv else 0,
        })
    return items
def cat(name,no):
    out=[];pg=1
    while pg<=80:
        it=parse(fetch(f'https://futureterior.com/product/list.html?cate_no={no}&page={pg}'))
        if not it: break
        out+=it
        if len(it)<48: break
        pg+=1
    return name,out
res={}
with cf.ThreadPoolExecutor(6) as ex:
    for name,out in ex.map(lambda kv: cat(*kv), cats.items()):
        res[name]=out; print(name,len(out),'리뷰합',sum(x['review'] for x in out),flush=True)
json.dump(res,open('ft_products2.json','w',encoding='utf-8'),ensure_ascii=False)
