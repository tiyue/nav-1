let $siteList = $('.siteList')
let $lastLi = $siteList.find('li.last')
let x = localStorage.getItem('x')
let xObject = JSON.parse(x)

let hasMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' }, { logo: 'b', url: 'http://www.bilibili.com' },
]
let simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hasMap.forEach((node, index) => {
        let $li = $(`
            <li>
                
                    <div class="site">
                        <div class="logo">${node.logo[0]}</div>
                        <div class="link">${simplifyUrl(node.url)}</div>
                        <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                        </div>
                    </div>
                
            </li >`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            console.log(hasMap)
            hasMap.splice(index, 1)
            render()
        })
    })
}
render()
$('.addButton')
    .on('click', () => {
        let url = window.prompt('新增网址为')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hasMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            url: url
        });
        render()
    });

window.onbeforeunload = () => {
    let string = JSON.stringify(hasMap)
    localStorage.setItem('x', string)
}
/*$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hasMap.length; i++) {
        if (hasMap[i].logo.toLowerCase() === key) {
            window.open(hasMap[i].url)
        }
    }
})*/


