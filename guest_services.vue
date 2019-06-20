<template>
    <div v-if="currentPage">
        <div v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<!--http://via.placeholder.com/1920x300-->
			<div class="site_container">
				<div class="header_content">
					<h1 v-if="locale=='en-ca'">{{currentPage.title}}</h1>
					<h1 v-else>{{currentPage.title_2}}</h1>
					<h2 style="display:none;">Scroll to  view page details</h2>
					<h3 style="display:none;">View page details</h3>
				</div>
			</div>
		</div>
		<div class="site_container inside_page_content page_content">
            <div class="margin_side_20" >
                <div class="row event_container"  v-if="accessibilityData"  v-for="promo in accessibilityData">
					<div class="col-sm-12 col-md-12 event_dets_container">
						<h4 class="event_name caps">{{promo.notice_title}}</h4>
						<div class="event_thick_line"></div>
						<p class="event_dates">{{promo.service_completed_date | moment("MMMM D, YYYY", timezone)}}</p>
						<p class="event_desc" v-html="promo.notice_text_approved"></p>
						
					</div>
					<div class="col-sm-12">
						<hr>
					</div>
				</div>
                <div v-if="accessibilityData" style="padding-top:20px;"></div> 
                <div class="page_body description_text text_left" v-if="locale=='en-ca'" v-html="currentPage.body"></div>
                <div class="page_body description_text text_left" v-else v-html="currentPage.body_2"></div>
            </div>
        </div>
        
    </div>
    <!--Pages Banner-->
</template>
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment"], function(Vue, Vuex, moment, tz, VueMoment) {
        return Vue.component("page-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    success_subscribe: false,
                    currentPage: null,
                    pageBanner : null,
                    accessibilityData : null
                }
            },
            props:['id', 'locale'],
            beforeRouteUpdate(to, from, next) {
                next();
                this.updatePageData(to.params.id);
            },
            created(){
               this.updatePageData(this.id);
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findRepoByName'
                ])
            },
            methods: {
                loadData: async function(id) {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/" + this.id + ".json"}),this.$store.dispatch("getData", "repos")]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },

            }
        });
    });
</script>