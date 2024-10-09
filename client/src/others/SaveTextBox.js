/**
*    @author V / Lou du Poitou
*    @license MIT License
*    <save-text-box> Custom Element
*/
// https://encryption.nexcord.pro/lou-du-poitou //

const getLang = () => {
    const languages = {
        "fr": ["Modifier", "Annuler", "Enregistrer"],
        "en": ["Edit", "Cancel", "Save"],
        "de": ["Ändern", "Stornieren", "Speichern"],
        "es": ["Editar", "Anular", "Grabar"]
    };

    return languages[document.documentElement.lang] ? 
    languages[document.documentElement.lang] : 
    languages["en"];
}

class SaveTextBox extends HTMLElement {
    constructor() {
        super();
        this.saveValue = this.innerText.trim();
        this.innerHTML = `
            <form style="display: block; border: solid 2px #000000; border-radius: 5px; margin: 0 auto; min-width: 180px;" onsubmit="return false;">
                <div style="display: flex;">
                    <textarea style="resize: none; width: 100%; padding: 0; margin: 5px; height: 200px; outline: none;" readonly title="content">${this.saveValue}</textarea>
                </div>
                <div style="display: flex; justify-content: space-around;">
                    <button id="stb-edit" type="button" title="edit" style="margin: 5px; width: 50%; cursor: pointer;">${getLang()[0]}</button>
                    <button id="stb-cancel" type="button" title="cancel" style="margin: 5px; width: 50%; cursor: pointer; display: none;">${getLang()[1]}</button>
                </div>
            </form>
        `;
        this.querySelector("#stb-edit").addEventListener("click", (e) => {
            const edit = this.querySelector("#stb-edit"), 
            textarea = this.querySelector("textarea"),
            cancel = this.querySelector("#stb-cancel");
            textarea.readOnly = !textarea.readOnly;
            if (textarea.readOnly) {
                edit.textContent = getLang()[0];
                edit.type = "submit";
                cancel.style.display = "none";
            } else {
                edit.textContent = getLang()[2];
                edit.type = "button";
                cancel.style.display = "block";
            }
            return null;
        });
        this.querySelector("#stb-cancel").addEventListener("click", (e) => {
            const edit = this.querySelector("#stb-edit"), 
            textarea = this.querySelector("textarea"),
            cancel = this.querySelector("#stb-cancel");
            textarea.readOnly = !textarea.readOnly;
            edit.textContent = getLang()[0];
            textarea.value = this.saveValue;
            cancel.style.display = "none";
            return null;
        });
        this.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault();
            const textarea = this.querySelector("textarea")
            this.saveValue = textarea.value.trim();
            textarea.value = this.saveValue;
            return this.saveValue;
        });
        this.setSaveValue = (value) => {
            value = String(value).trim();
            this.saveValue = value;
            this.querySelector("textarea").value = value;
            return value;
        }
    }

    connectedCallback() {
        console.log("> Save TextBox ready !");
    }

    disconnectedCallback() {
        console.log("< Save TextBox unset !");
    }
}

customElements.define("save-text-box", SaveTextBox);

// https://encryption.nexcord.pro/lou-du-poitou //