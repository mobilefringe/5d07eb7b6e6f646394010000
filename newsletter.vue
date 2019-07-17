<template>
    <div v-if="dataloaded" id="contact_us_container"> <!-- this component template will not render without an outer container div -->
        <div v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<div class="site_container">
				<div class="header_content">
					<h1>{{$t("newsletter_page.newsletter")}}</h1>
				</div>
			</div>
		</div> 
        <div class="site_container">
            <div class="row">
                <div class="col-md-12">
                    <div class="text-left" v-if="currentPage.body" v-html="currentPage.body"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <!-- Begin Constant Contact Inline Form Code -->
                    <div class="ctct-inline-form" data-form-id="5d453944-e3ff-44bb-9b42-ee4243b38e96"></div>
                    <!-- End Constant Contact Inline Form Code -->
                    <div id="cc_universal_code"></div>
                </div>
            </div>
            <div class="padding_top_40"></div>    
        </div>
    </div>
</template>

<style>
    div.ctct-form-embed div.ctct-form-defaults {
        margin-top: 30px;
        padding: 0 !important;
        background-color: transparent !important;
    }
    div.ctct-form-embed form.ctct-form-custom label.ctct-form-label {
        margin-left: 12px;
    }
    .ctct-form-footer-img {
        display: none !important;   
    }
</style>
 
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", 'vee-validate', 'jquery', 'utility', 'postscribe'], function(Vue, Vuex, moment, tz, VueMoment, VeeValidate, $, Utility, postscribe) {
        return Vue.component("newsletter-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dataloaded: false,
                    pageBanner: null,
                    currentPage: {}
                }
            },
            created () {
                this.loadData().then(response => {
                    var temp_repo = this.findRepoByName('Newsletter Banner');
                    if (temp_repo && temp_repo.images) {
                        this.pageBanner = temp_repo.images[0];
                    } else {
                        this.pageBanner = {};
                        this.pageBanner.image_url = "";
                    }
                    
                    // setTimeout(function() {
                        this.dataloaded = true;
                    // }, 500);
                    
                }); 
                this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "	/pages/sevenoaks-newsletter.json"}).then(response => {
                    this.currentPage = response.data;
                });
            },
            mounted(){
                postscribe('#cc_universal_code', '<script id="signupScript" src="//static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js"></script>')
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findRepoByName'
                ])
            },
            methods: {
                loadData: async function() {
                    try {
                        let results = await Promise.all([
                            this.$store.dispatch("getData", "repos")
                        ]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                }
            }
        });
    });
</script>
