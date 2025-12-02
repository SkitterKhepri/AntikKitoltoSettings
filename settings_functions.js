var settings = JSON.parse('{"overlayOn":true,"tematikaGombok":[{"text":"R","tematikaText":"Irodalom / Szépirodalom / Regény","tematikaId":"070101","teljes":true},{"text":"Krimi","tematikaText":"Irodalom / Szórakoztató irodalom / Krimi, bűnügyi, thriller","tematikaId":"070201","teljes":true},{"text":"Romi","tematikaText":"Irodalom / Szépirodalom / Romantikus, kalandos","tematikaId":"070102","teljes":true},{"text":"Ifj","tematikaText":"Gyermek és ifjúsági / Ifjúsági irodalom / Szépirodalom","tematikaId":"060401","teljes":true},{"text":"Mese","tematikaText":"Gyermek és ifjúsági / Mesekönyv / ","tematikaId":"","teljes":false},{"text":"Irod Tud","tematikaText":"Irodalom / Irodalomtud., -történet, -elm. / ","tematikaId":"","teljes":false},{"text":"Pszi","tematikaText":"Társ. tudományok / Pszichológia","tematikaId":"1813","teljes":true},{"text":"Fest","tematikaText":"Művészet, építészet / Képzőművészet / Festészet","tematikaId":"110701","teljes":true},{"text":"Kereszt","tematikaText":"Vallás, mitológia / Kereszténység","tematikaId":"2208","teljes":true},{"text":"TermTud","tematikaText":"Tudomány és Természet / ","tematikaId":"","teljes":false},{"text":"Tech","tematikaText":"Tudomány és Természet / Technika / ","tematikaId":"","teljes":false},{"text":"Élet","tematikaText":"Életmód, egészség / ","tematikaId":"","teljes":false},{"text":"Költ","tematikaText":"Irodalom / Költészet / ","tematikaId":"","teljes":false},{"text":"M töri","tematikaText":"Történelem / Magyar történelem / ","tematikaId":"","teljes":false},{"text":"E töri","tematikaText":"Történelem / Egyetemes történelem / ","tematikaId":"","teljes":false}],"illusztracioGombok":[{"text":"FF","illusztracioText":"fekete-fehér képek"},{"text":"SZ","illusztracioText":"színes képek"},{"text":"FF & SZ","illusztracioText":"fekete-fehér és színes képek"}],"nyelvGombok":[{"text":"Angol","nyelvId":"0000000008","nyelvText":"ANGOL"},{"text":"Német","nyelvId":"0000000002","nyelvText":"NÉMET"},{"text":"Francia","nyelvId":"0000000006","nyelvText":"FRANCIA"},{"text":"Olasz","nyelvId":"0000000004","nyelvText":"OLASZ"},{"text":"Spanyol","nyelvId":"0000000005","nyelvText":"SPANYOL"},{"text":"Magyar","nyelvId":"0000000001","nyelvText":"MAGYAR"}],"celkozonsegGombok":[{"text":"Felnőtt","celkozonsegId":"00104","celkozonsegText":"Felnőtt"},{"text":"Ifjú","celkozonsegId":"0010299","celkozonsegText":"Ifjúsági-mind"},{"text":"Gyermek","celkozonsegId":"0010199","celkozonsegText":"Gyermek-mind"},{"text":"Ifj & Gyer","celkozonsegId":"00103","celkozonsegText":"Gyermek és ifjúsági"}],"kotesGombok":[{"text":"Kemény","kotesId":"0000000019","kotesText":"KEMÉNYTÁBLA"},{"text":"Puha","kotesId":"0000000025","kotesText":"PUHATÁBLÁS"},{"text":"Védő","kotesId":"0000000008","kotesText":"KEMÉNYTÁBLA, VÉDŐBORÍTÓ"},{"text":"Irka","kotesId":"0000000020","kotesText":"IRKAFŰZÖTT"}]}')

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
    return {'mainPanel' : mainPanel, 'frag1' : frag1, 'frag2' : frag2}
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

function addOverlayToggleListener(){
    let toggle = document.getElementById('overlaySwitch')
    toggle.addEventListener('click', () =>{

    })
}


function saveSettings(){
    console.log('BOOTSTRAP_CSS_HREF')
}