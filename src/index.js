import jquery from 'jquery'
let $ = jquery
const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

let hashMap = xObject || [
    {logo:'A',logoType:'text',url:'http://www.acfun.cn'},
    {logo:'./src/images/bilibili.png',logoType:'image',url:'http://www.bilibili.com'},
]

const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node)=>{
        if (node.logoType === 'text') {      
            let $li = $(`
            <li>               
                    <div class="site">
                        <div class="logo">${node.logo}</div>
                        <div class="link">${simplifyUrl(node.url)}</div>
                        <div class="close">
                            <svg class="icon">
                                <use xlink:href="#icon-guanbi"></use>
                            </svg>
                        </div>
                        <div class="change">
                        <svg class="icon">
                            <use xlink:href="#icon-xiugai"></use>
                        </svg>
                    </div>
                    </div>
            </li>
            `).insertBefore($lastLi)
        }else if (node.logoType === 'image') {
            let $li = $(`
            <li>
                <div class="site">
                    <div class="logo">
                        <img src="" alt="">
                    </div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-guanbi"></use>
                        </svg>
                    </div>
                    <div class="change">
                        <svg class="icon">
                            <use xlink:href="#icon-xiugai"></use>
                        </svg>
                    </div>
                </div>
            </li>
            `).insertBefore($lastLi)
            $('.logo img').attr('src','/bilibili.66c0ad06.png')
        }
    })
}
const simplifyUrl = (url)=>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace('/\/.*/','')
}

render()
// 添加网站
$('.addButton').on('click',  ()=> {
    let url = window.prompt('请问你要添加的网址是啥')
    if (url !== null) {  
        if (url.indexOf('http')!==0) {
           url = 'http://'+ url
           let firstUrl = simplifyUrl(url)[0].toUpperCase()
           hashMap.push({
               logo:firstUrl,
               logoType:'text',
               url:url
           })
       }
    }
    render()
    
})
// 委托点击条件事件
$('.globalMain').on('click','.site','div',  (e)=> {
    let $link = $(e.currentTarget).find('.link')
    hashMap.forEach((item)=>{
        if (simplifyUrl(item.url) === $link.text()) {
            window.open(item.url)
        }
    })
})
// 委托关闭事件
$('.globalMain').on('click','.close','div',  (e)=> {
    e.stopPropagation() //阻止冒泡
    let $link = $(e.currentTarget).parent().find('.link')
    hashMap.forEach((item,index)=>{
        if (simplifyUrl(item.url) === $link.text()) {
            hashMap.splice(index,1)
        }
    })
    render()
})
//委托改变网站事件
$('.globalMain').on('click','.change','div',  (e)=> {
    e.stopPropagation();
    e.preventDefault();
    let $link = $(e.currentTarget).parent().find('.link')
    let url = window.prompt('请问你要修改的网址是啥?')
    if (url === '') {
        url = $link.text()
    }else if (url !== null) { 
        if (url.indexOf('http')!==0) {
            url = 'http://'+ url
            hashMap.forEach((item)=>{
                if (simplifyUrl(item.url) === $link.text()) {
                    item.url = url
                    item.logo = simplifyUrl(url)[0].toUpperCase()
                }
            })
        }
    }
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
        {logo:'./src/images/bilibili.png',logoType:'image',url:'http://www.bilibili.com'},
    ]
    render()
})

$(document).on('keypress',(e)=>{
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase()=== key.toLowerCase()) {
             window.open(hashMap[i].url)
        }
    }
})