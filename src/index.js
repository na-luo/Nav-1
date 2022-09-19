import jquery from 'jquery'
let $ = jquery
const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

let hashMap = xObject || [
    {logo:'A',logoType:'text',url:'http://www.acfun.cn'},
    {logo:'http://localhost:1234/src/images/bilibili.png',logoType:'image',url:'http://www.bilibili.com'},
]

const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index)=>{
        let $li
        if (node.logoType === 'text') {      
            $li = $(`
            <li>               
                    <div class="site">
                        <div class="logo">${node.logo}</div>
                        <div class="link">${simplifyUrl(node.url)}</div>
                        <div class="close">
                            <svg class="icon">
                                <use xlink:href="#icon-guanbi"></use>
                            </svg>
                        </div>
                    </div>
            </li>
            `).insertBefore($lastLi)
        }else if (node.logoType === 'image') {
            $li = $(`
            <li>
                <div class="site">
                    <div class="logo">
                        <img src="${node.logo}" alt="">
                    </div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-guanbi"></use>
                        </svg>
                    </div>
                </div>
            </li>
            `).insertBefore($lastLi)
        }
        $li.on('click',  ()=> {
            window.open(node.url)
        });
        $li.on('click','.close',(e)=>{
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index,1)
            render()
        })

    })
}
const simplifyUrl = (url)=>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace('/\/.*/','')
}

render()

$('.addButton').on('click',  ()=> {
    let url = window.prompt('请问你要添加的网址是啥')
    if (url.indexOf('http')!==0) {
        url = 'http://'+ url
    }
    let firstUrl = simplifyUrl(url)[0].toUpperCase()
    hashMap.push({
        logo:firstUrl,
        logoType:'text',
        url:url
    })
    render()
    
})

//页面关闭时候触发

window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}
$('.reButton').on('click',()=>{
    hashMap = [
        {logo:'A',logoType:'text',url:'http://www.acfun.cn'},
        {logo:'./images/bilibili.png',logoType:'image',url:'http://www.bilibili.com'},
    ]
    render()
})

$(document).on('keypress',(e)=>{
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase()=== key) {
             window.open(hashMap[i].url)
        }
    }
})