import { config } from './Countries.js';

export class Autosuggest {
    constructor(input) {
        this.input = input;
        this.addedTags = [];
    }
    /**
     * Initialize the dropdown
     */
    init() {
        this.addedTagsContainer = document.createElement('div', 'addedTagsContainer');
        this.addedTagsContainer.className = 'addedTagsContainer';
        document.body.appendChild(this.addedTagsContainer);
        this.input.addEventListener('input', this.inputOnChange.bind(this));

        this.container = document.createElement('div', "container");
        this.container.className = 'container';
        document.body.appendChild(this.container);
    }

    
    /**
     * Function call on input change in the input box
     */
    inputOnChange() {
        var countries = config.countries;
        var val = this.input.value;
        this.container.innerHTML = "";

        if (val.length != 0) {
            for (let i = 0; i < countries.length; i++) {
                let countryEl = document.createElement('div');
                countryEl.className = 'country';
                countryEl.innerText = countries[i].Name;
                if (countries[i].Name.toLowerCase().includes(val.toLowerCase()) && this.addedTags.indexOf(countries[i].Name) == -1) {
                    countryEl.addEventListener('click', this.onCountryClick.bind(this, countries[i]));
                    this.container.appendChild(countryEl);
                }
            }
        }
    }

    
    /**
     * @param  {} country
     * to add to the tags list
     */
    onCountryClick(country){
        this.addedTags.push(country.Name);
        this.addCountries.bind(this);
    }

    /**
     * @param  {} tag
     * to remove from the tag list
     */
    onHandleAddedTagClicked(tag){
        var ind = this.addedTags.indexOf(tag);
        if(ind != -1){
            this.addedTags.splice(ind, 1);
            this.addCountries.bind(this);
        }
    }

    
    /**
     * To generate the dropdown list
     */
    addCountries(){
        this.addedTagsContainer.innerHTML = "";
        for(let i=0; i < this.addedTags.length; i++){
            var countryAddedEl = document.createElement('div', 'countryAddedTag');
            countryAddedEl.className = 'countryAdded';
            countryAddedEl.innerHTML = this.addedTags[i];
            countryAddedEl.addEventListener('click', this.onHandleAddedTagClicked.bind(this, this.addedTags[i]));
            this.addedTagsContainer.appendChild(countryAddedEl);
        }
        this.inputOnChange.bind(this)();
    }
    
}