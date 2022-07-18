function openTab(){

    let newTab = browser.tabs.create({
        url:'https://twitter.com/abhilekh_gautam',
        active:true
    })
}

browser.browserAction.onClicked.addListener(openTab)
