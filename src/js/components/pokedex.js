var POKEDEX = {
    delimiters: ['${', '}'],
    template: ' <div class="c-pokedex">\
                    <img class="bg" :src="setPokedexBg">\
                    <div class="application">\
                        <div class="content">\
                            <div class="details">\
                                <div v-if="contextPokemon" class="card">\
                                    <span class="id">#${contextPokemon.id}</span>\
                                    <img :src="contextPokemon.image">\
                                    <p class="name">${contextPokemon.name}</p>\
                                    <div class="types">\
                                        <span v-for="type in contextPokemon.types">${type}</span>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="typeFilter">\
                                <p>Filter By Type</p>\
                                <div>\
                                    <button v-for="(type, index) in types" v-on:click.stop="getPokemonsByType(type.url)">${type.name}</button>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="listing">\
                            <div class="pokemons">\
                                <button v-for="pokemon in pokemons" v-on:click="getPokemonDetails(pokemon.url)">\
                                    <span># ${pokemon.url|getPokemonId}</span>\
                                    - \
                                    <span>${pokemon.name}</span>\
                                </button>\
                            </div>\
                            <div class="pagination">\
                                <button v-if="prevPokemonListPage" v-on:click.stop="paginate(prevPokemonListPage)">previous</button>\
                                <button v-if="nextPokemonListPage" v-on:click.stop="paginate(nextPokemonListPage)">next</button>\
                            </div>\
                        </div>\
                    </div>\
                </div>',
    props: {
        apiUrl: {type:String, default: "https://pokeapi.co/api/v2/"},
    },
    data: function () {
        return {
            isMobileViewPort: false,
            pokemons: [],
            types: [],
            nextPokemonListPage: null,
            prevPokemonListPage: null,
            contextPokemon: null,
        }
    },
    computed: {
        setPokedexBg: function () {
            return (this.isMobileViewPort == true) ? "/assets/img/pokedex-mobile.svg" : "/assets/img/pokedex.svg"
        }
    },
    filters: {
        getPokemonId: function(url){
            return url.split("/")[6];
        }
    },
    methods: {
        getTypes: function(url){
            var self = this;
            axios.get(url)
            .then(function (response) {
                self.types = response.data.results;
            })
            .catch(function (error) {
                console.log(error);;
            })
        },
        getPokemons: function(url){
            var self = this;
            axios.get(url)
            .then(function (response) {
                self.pokemons = response.data.results;
                self.nextPokemonListPage = response.data.next;
                self.prevPokemonListPage = response.data.previous;
            })
            .catch(function (error) {
                console.log(error);;
            })
        },
        getPokemonsByType: function(url){
            var self = this;
            axios.get(url)
            .then(function (response) {
                self.pokemons = [];
                for (var i = 0, len = response.data.pokemon.length; i < len; i++) {
                    self.pokemons.push(response.data.pokemon[i].pokemon)
                }
            })
            .catch(function (error) {
                console.log(error);;
            })
        },
        getPokemonDetails: function (url) {
            var self = this;
            axios.get(url)
            .then(function (response) {
                var types = [];
                for (var i = 0, len = response.data.types.length; i < len; i++) {
                    types.push(response.data.types[i].type.name)
                }
                self.contextPokemon = {
                    "id": response.data.id,
                    "name": response.data.name,
                    "image": response.data.sprites.front_default,
                    "types": types
                }
            })
            .catch(function (error) {
                console.log(error);;
            })
        },
        paginate: function(Url){
            this.getPokemons(Url);
        },
        setResizeListener: function() {
            window.addEventListener('resize', function() {
                this.isMobileViewPort = document.documentElement.clientWidth <= 753;
            }.bind(this))
        }
    },
    mounted: function (){
        this.isMobileViewPort = document.documentElement.clientWidth <= 753;
        this.setResizeListener();
        this.getPokemons(this.apiUrl + "pokemon");
        this.getTypes(this.apiUrl + "type");
    },
};

RUR(function () {
    new Vue({
        el: document.querySelector('[data-el=pokedex]'),
        components: {
            'pokedex': POKEDEX,
        },
    });
});