function beallitasokToggle(mainPanel, frag1, frag2){
    if(!mainPanel.settingsOn){
        frag2.appendChild(mainPanel.children[1])
        mainPanel.appendChild(frag1)
        mainPanel.settingsOn = true
    }
    else{
        frag1.appendChild(mainPanel.children[1])
        mainPanel.appendChild(frag2)
        mainPanel.settingsOn = false
    }
}

function toggleBootstrap(bootstrapEnabled, bootstrapLink){
    if(!bootstrapEnabled){
        document.head.appendChild(bootstrapLink)
        // addStylesheet(BOOTSTRAP_JS_HREF)
        return true
    }
    else{
        document.head.removeChild(bootstrapLink)
        return false
    }
}






function saveSettings(){
    console.log('aaaaaaa!')
}