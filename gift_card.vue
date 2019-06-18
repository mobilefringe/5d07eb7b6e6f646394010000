<template>
	<div v-if="dataloaded">
		<div class="page_header" v-if="promoBanner" v-lazy:background-image="promoBanner.image_url">
			<div class="site_container">
				<div class="header_content caps">
					<h1>Gift Cards</h1>
				</div>
			</div>
		</div>
		<div class="site_container page_content">
		    <div class="col-sm-12">
                <div v-if="currentPage" v-html="currentPage.body"></div>
            </div>
		</div>
	</div>
</template>


<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue-lazy-load", "vue-paginate", "vue-social-sharing"], function(Vue, Vuex, moment, tz, VueMoment, Meta, VueLazyload, VuePaginate, SocialSharing) {
        Vue.use(Meta);
        Vue.use(VueLazyload);
        Vue.use(VuePaginate);
        return Vue.component("gift_card", {
            template: template, // the variable template will be injected
            props:['locale'],
            data: function() {
                return {
                    pageBanner: null,
                    currentPage: null,
                    dataloaded: false,
                    promoBanner: null
                }
            },
            created() {
                this.loadData().then(response => {
                    this.posts
                    this.dataloaded = true;
                    
                    var temp_repo = this.findRepoByName('Gift Card Banner');
                    if(temp_repo) {
                        this.promoBanner = temp_repo.images[0];
                    }
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedEvents',
                    'findRepoByName',
                    'findBlogByName'
                ]),
            },
            methods: {
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        var host = this.property.mm_host.replace("http:", "");
                        let results = await Promise.all([this.$store.dispatch('LOAD_PAGE_DATA', {url: host + " /pages/sevenoaks-gift-cards.json"}),this.$store.dispatch("getData", "contests"),this.$store.dispatch("getData", "repos")]);
                        return results;
                        console.log(results, "res")
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
            }
        });
    });
</script>