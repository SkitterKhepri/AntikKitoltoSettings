var settings = JSON.parse('{"overlayOn":true,"tematikaGombok":[{"text":"R","tematikaText":"Irodalom / Szépirodalom / Regény","tematikaId":"070101","teljes":true},{"text":"Krimi","tematikaText":"Irodalom / Szórakoztató irodalom / Krimi, bűnügyi, thriller","tematikaId":"070201","teljes":true},{"text":"Romi","tematikaText":"Irodalom / Szépirodalom / Romantikus, kalandos","tematikaId":"070102","teljes":true},{"text":"Ifj","tematikaText":"Gyermek és ifjúsági / Ifjúsági irodalom / Szépirodalom","tematikaId":"060401","teljes":true},{"text":"Mese","tematikaText":"Gyermek és ifjúsági / Mesekönyv / ","tematikaId":"","teljes":false},{"text":"Irod Tud","tematikaText":"Irodalom / Irodalomtud., -történet, -elm. / ","tematikaId":"","teljes":false},{"text":"Pszi","tematikaText":"Társ. tudományok / Pszichológia","tematikaId":"1813","teljes":true},{"text":"Fest","tematikaText":"Művészet, építészet / Képzőművészet / Festészet","tematikaId":"110701","teljes":true},{"text":"Kereszt","tematikaText":"Vallás, mitológia / Kereszténység","tematikaId":"2208","teljes":true},{"text":"TermTud","tematikaText":"Tudomány és Természet / ","tematikaId":"","teljes":false},{"text":"Tech","tematikaText":"Tudomány és Természet / Technika / ","tematikaId":"","teljes":false},{"text":"Élet","tematikaText":"Életmód, egészség / ","tematikaId":"","teljes":false},{"text":"Költ","tematikaText":"Irodalom / Költészet / ","tematikaId":"","teljes":false},{"text":"M töri","tematikaText":"Történelem / Magyar történelem / ","tematikaId":"","teljes":false},{"text":"E töri","tematikaText":"Történelem / Egyetemes történelem / ","tematikaId":"","teljes":false}],"illusztracioGombok":[{"text":"FF","illusztracioText":"fekete-fehér képek"},{"text":"SZ","illusztracioText":"színes képek"},{"text":"FF & SZ","illusztracioText":"fekete-fehér és színes képek"}],"nyelvGombok":[{"text":"Angol","nyelvId":"0000000008","nyelvText":"ANGOL"},{"text":"Német","nyelvId":"0000000002","nyelvText":"NÉMET"},{"text":"Francia","nyelvId":"0000000006","nyelvText":"FRANCIA"},{"text":"Olasz","nyelvId":"0000000004","nyelvText":"OLASZ"},{"text":"Spanyol","nyelvId":"0000000005","nyelvText":"SPANYOL"},{"text":"Magyar","nyelvId":"0000000001","nyelvText":"MAGYAR"}],"celkozonsegGombok":[{"text":"Felnőtt","celkozonsegId":"00104","celkozonsegText":"Felnőtt"},{"text":"Ifjú","celkozonsegId":"0010299","celkozonsegText":"Ifjúsági-mind"},{"text":"Gyermek","celkozonsegId":"0010199","celkozonsegText":"Gyermek-mind"},{"text":"Ifj & Gyer","celkozonsegId":"00103","celkozonsegText":"Gyermek és ifjúsági"}],"kotesGombok":[{"text":"Kemény","kotesId":"0000000019","kotesText":"KEMÉNYTÁBLA"},{"text":"Puha","kotesId":"0000000025","kotesText":"PUHATÁBLÁS"},{"text":"Védő","kotesId":"0000000008","kotesText":"KEMÉNYTÁBLA, VÉDŐBORÍTÓ"},{"text":"Irka","kotesId":"0000000020","kotesText":"IRKAFŰZÖTT"}]}')

function beallitasokToggle(mainPanel, settingsFrag, booklistFrag, beallitasProfilok, currentSettingsKey){
    if(!mainPanel.settingsOn){
        booklistFrag.appendChild(mainPanel.children[1])
        //populate settings page with settings data here
        populateSettings(settingsFrag, beallitasProfilok, currentSettingsKey)
        makeSettingsCollapsible(settingsFrag)
        mainPanel.appendChild(settingsFrag)
        mainPanel.settingsOn = true
    }
    else{
        settingsFrag.appendChild(mainPanel.children[1])
        mainPanel.appendChild(booklistFrag)
        mainPanel.settingsOn = false
    }
    return {'mainPanel' : mainPanel, 'settingsFrag' : settingsFrag, 'booklistFrag' : booklistFrag}
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

function addAllListeners(){

}

//TODO add field(s)(new row) to be able to add new buttons

function addOverlayToggleListener(){
    let toggle = document.getElementById('overlaySwitch')
    toggle.addEventListener('click', () =>{
        currentSettings.overlayOn = !currentSettings.overlayOn
    })
}

function addSaveSettingsListener(settingsFrag){
    let button = settingsFrag.getElementById('mentes')
    let visszaButton = settingsFrag.getElementById('vissza')
    button.addEventListener('click', ()=> {
        let felhasznalonev = document.getElementById('felhasznaloNev').value
        if(felhasznalonev){
            visszaButton.classList.add('disabled')
            button.classList.add('disabled')
            beallitasProfilok.felhasznalonev = currentSettings
            currentSettingsKey = felhasznalonev
            GM_setValue('lastBeallitasokKey', currentSettingsKey)
            GM_setValue('beallitasok', beallitasProfilok)
            loadSettings()
            let saveAlert = document.getElementById('saveAlertWrapper')
            toggleAlert(saveAlert)
            setTimeout(toggleAlert, 850, saveAlert)
            visszaButton.classList.remove('disabled')
            button.classList.remove('disabled')
        }
    })
}

function addAccordionListener(settingsFrag, tipusPrefix){
    let celElem = settingsFrag.getElementById(tipusPrefix + 'Title')
    let downArrowNode = settingsFrag.getElementById(tipusPrefix + 'Down')
    let upArrowNode = settingsFrag.getElementById(tipusPrefix + 'Up')
    if(celElem.dataset.listening == 0){
        celElem.addEventListener('click', ()=> {
            if(celElem.dataset.expanded == 1){
                celElem.parentNode.children[1].classList.add('d-none')
                celElem.dataset.expanded = 0
                upArrowNode.classList.add('d-none')
                downArrowNode.classList.remove('d-none')
            }
            else if(celElem.dataset.expanded == 0){
                celElem.parentNode.children[1].classList.remove('d-none')
                celElem.dataset.expanded = 1
                upArrowNode.classList.remove('d-none')
                downArrowNode.classList.add('d-none')
            }
        })
        celElem.dataset.listening = 1
    }
}

function populateSettings(settingsFrag, beallitasProfilok, currentSettingsKey){
    let tematikaTemplate = settingsFrag.getElementById('tematikaTemplate').children[0]
    let nyelvTemplate = settingsFrag.getElementById('nyelvTemplate').children[0]
    let celkozonsegTemplate = settingsFrag.getElementById('celkozonsegTemplate').children[0]
    let kotesTemplate = settingsFrag.getElementById('kotesTemplate').children[0]
    let illusztracioTemplate = settingsFrag.getElementById('illusztracioTemplate').children[0]
    //TEST!! TODO uncomment and delete
    let currentSettings = settings
    // let currentSettings = beallitasProfilok[currentSettingsKey]
    populateUsername(settingsFrag, currentSettingsKey)
    populateTematikaGombok(settingsFrag, tematikaTemplate, currentSettings)
    populateNyelvGombok(settingsFrag, nyelvTemplate, currentSettings)
    populateCelkozonsegGombok(settingsFrag, celkozonsegTemplate, currentSettings)
    populateKotesGombok(settingsFrag, kotesTemplate, currentSettings)
    populateIllusztracioGombok(settingsFrag, illusztracioTemplate, currentSettings)
}

function makeSettingsCollapsible(settingsFrag){
    addAccordionListener(settingsFrag, 'tematika')
    addAccordionListener(settingsFrag, 'nyelv')
    addAccordionListener(settingsFrag, 'celkozonseg')
    addAccordionListener(settingsFrag, 'kotes')
    addAccordionListener(settingsFrag, 'illusztracio')
}

function populateTematikaGombok(settingsFrag, tematikaTemplate, currentSettings){
    let tematikaContainer = settingsFrag.getElementById('tematikaContainer')
    tematikaContainer.innerHTML = ''
    let tempFrag = new DocumentFragment()
    let sorSzam = 1
    for(tematikaGomb of currentSettings.tematikaGombok){
        //clone template
        let tematikaElem = tematikaTemplate.cloneNode(true)
        let idSzam = sorSzam-1
        tempFrag.appendChild(tematikaElem)
        let torlesGomb = tempFrag.querySelector("button[name='torles']")
        //sor számozása
        tempFrag.getElementById('sorId').innerText = sorSzam
        //Gomb txt
        addFieldBindings(tempFrag.getElementById('tematikaGombText'), tematikaGomb.text, currentSettings.tematikaGombok[idSzam].text)
        //kitöltendő txt
        addFieldBindings(tempFrag.getElementById('tematikaText'), tematikaGomb.tematikaText, currentSettings.tematikaGombok[idSzam].tematikaText)
        //teljes-e
        addFieldBindings(tempFrag.getElementById('teljesCheck'), tematikaGomb.teljes, currentSettings.tematikaGombok[idSzam].teljes, true)
        //tematika ID
        addFieldBindings(tempFrag.getElementById('tematikaId'), tematikaGomb.tematikaId, currentSettings.tematikaGombok[idSzam].tematikaId)
        addDeleteFunctionality(torlesGomb, currentSettings.tematikaGombok, idSzam, populateTematikaGombok, settingsFrag, tematikaTemplate, currentSettings)
        tematikaContainer.appendChild(tempFrag)
        sorSzam++;
    }
}

function populateNyelvGombok(settingsFrag, nyelvTemplate, currentSettings){
    let nyelvContainer = settingsFrag.getElementById('nyelvContainer')
    nyelvContainer.innerHTML = ''
    let tempFrag = new DocumentFragment()
    let sorSzam = 1
    for(nyelvGomb of currentSettings.nyelvGombok){
        //clone template
        let nyelvElem = nyelvTemplate.cloneNode(true)
        let idSzam = sorSzam-1
        tempFrag.appendChild(nyelvElem)
        let torlesGomb = tempFrag.querySelector("button[name='torles']")
        //sor számozása
        tempFrag.getElementById('sorId').innerText = sorSzam
        //Gomb txt
        addFieldBindings(tempFrag.getElementById('nyelvGombText'), nyelvGomb.text, currentSettings.nyelvGombok[idSzam].text)
        //kitöltendő txt
        addFieldBindings(tempFrag.getElementById('nyelvText'), nyelvGomb.nyelvText, currentSettings.nyelvGombok[idSzam].nyelvText)
        //nyelv ID
        addFieldBindings(tempFrag.getElementById('nyelvId'), nyelvGomb.nyelvId, currentSettings.nyelvGombok[idSzam].nyelvId)
        addDeleteFunctionality(torlesGomb, currentSettings.nyelvGombok, idSzam, populateNyelvGombok, settingsFrag, nyelvTemplate, currentSettings)
        nyelvContainer.appendChild(tempFrag)
        sorSzam++;
    }
}

function populateCelkozonsegGombok(settingsFrag, celkozonsegTemplate, currentSettings){
    let celkozonsegContainer = settingsFrag.getElementById('celkozonsegContainer')
    celkozonsegContainer.innerHTML = ''
    let tempFrag = new DocumentFragment()
    let sorSzam = 1
    for(celkozonsegGomb of currentSettings.celkozonsegGombok){
        //clone template
        let celkozonsegElem = celkozonsegTemplate.cloneNode(true)
        let idSzam = sorSzam-1
        tempFrag.appendChild(celkozonsegElem)
        let torlesGomb = tempFrag.querySelector("button[name='torles']")
        //sor számozása
        tempFrag.getElementById('sorId').innerText = sorSzam
        //Gomb txt
        addFieldBindings(tempFrag.getElementById('celkozonsegGombText'), celkozonsegGomb.text, currentSettings.celkozonsegGombok[idSzam].text)
        //kitöltendő txt
        addFieldBindings(tempFrag.getElementById('celkozonsegText'), celkozonsegGomb.celkozonsegText, currentSettings.celkozonsegGombok[idSzam].celkozonsegText)
        //célközönség ID
        addFieldBindings(tempFrag.getElementById('celkozonsegId'), celkozonsegGomb.celkozonsegId, currentSettings.celkozonsegGombok[idSzam].celkozonsegId)
        addDeleteFunctionality(torlesGomb, currentSettings.celkozonsegGombok, idSzam, populateCelkozonsegGombok, settingsFrag, celkozonsegTemplate, currentSettings)
        celkozonsegContainer.appendChild(tempFrag)
        sorSzam++;
    }
}

function populateKotesGombok(settingsFrag, kotesTemplate, currentSettings){
    let kotesContainer = settingsFrag.getElementById('kotesContainer')
    kotesContainer.innerHTML = ''
    let tempFrag = new DocumentFragment()
    let sorSzam = 1
    for(kotesGomb of currentSettings.kotesGombok){
        //clone template
        let kotesElem = kotesTemplate.cloneNode(true)
        let idSzam = sorSzam-1
        tempFrag.appendChild(kotesElem)
        let torlesGomb = tempFrag.querySelector("button[name='torles']")
        //sor számozása
        tempFrag.getElementById('sorId').innerText = sorSzam
        //Gomb txt
        addFieldBindings(tempFrag.getElementById('kotesGombText'), kotesGomb.text, currentSettings.kotesGombok[idSzam].text)
        //kitöltendő txt
        addFieldBindings(tempFrag.getElementById('kotesText'), kotesGomb.kotesText, currentSettings.kotesGombok[idSzam].kotesText)
        //kötés ID
        addFieldBindings(tempFrag.getElementById('kotesId'), kotesGomb.kotesId, currentSettings.kotesGombok[idSzam].kotesId)
        addDeleteFunctionality(torlesGomb, currentSettings.kotesGombok, idSzam, populateKotesGombok, settingsFrag, kotesTemplate, currentSettings)
        kotesContainer.appendChild(tempFrag)
        sorSzam++;
    }
}

function populateIllusztracioGombok(settingsFrag, illusztracioTemplate, currentSettings){
    let illusztracioContainer = settingsFrag.getElementById('illusztracioContainer')
    illusztracioContainer.innerHTML = ''
    let tempFrag = new DocumentFragment()
    let sorSzam = 1
    for(illusztracioGomb of currentSettings.illusztracioGombok){
        //clone template
        let illusztracioElem = illusztracioTemplate.cloneNode(true)
        let idSzam = sorSzam-1
        tempFrag.appendChild(illusztracioElem)
        let torlesGomb = tempFrag.querySelector("button[name='torles']")
        //sor számozása
        tempFrag.getElementById('sorId').innerText = sorSzam
        //Gomb txt
        addFieldBindings(tempFrag.getElementById('illusztracioGombText'), illusztracioGomb.text, currentSettings.illusztracioGombok[idSzam].text)
        //kitöltendő txt
        addFieldBindings(tempFrag.getElementById('illusztracioText'), illusztracioGomb.illusztracioText, currentSettings.illusztracioGombok[idSzam].illusztracioText)
        addDeleteFunctionality(torlesGomb, currentSettings.illusztracioGombok, idSzam, populateIllusztracioGombok, settingsFrag, illusztracioTemplate, currentSettings)
        illusztracioContainer.appendChild(tempFrag)
        sorSzam++;
    }
}

function populateUsername(settingsfrag, currentSettingsKey){
    settingsfrag.getElementById('felhasznaloNev').value = currentSettingsKey
}

function addFieldBindings(fieldElement, buttonPropValue, feedbackTarget, isCheck = false){
    if(!isCheck){
        fieldElement.value = buttonPropValue
    }
    else{
        fieldElement.checked = buttonPropValue
    }
    fieldElement.addEventListener('input', (e)=>{
        feedbackTarget = e.currentTarget.value
    })
}

function addDeleteFunctionality(torlesGomb, buttonList, buttonIndex, callingFunction, settingsFrag, template, currentSettings){
    torlesGomb.addEventListener('click', ()=>{
        buttonList.splice(buttonIndex, 1)
        callingFunction(settingsFrag, template, currentSettings)
        console.log(currentSettings)
    })
}

function toggleAlert(alert){
    if(alert.classList.contains('visually-hidden')){
        alert.classList.remove('visually-hidden')
    }
    else{
        alert.classList.add('visually-hidden')
    }
}


//----------Testing--------------


document.addEventListener("DOMContentLoaded", (event) => {
    populateSettings(document, {}, 'default')
    makeSettingsCollapsible(document)
});
