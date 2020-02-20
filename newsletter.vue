<template>
    <div v-if="dataloaded" id="contact_us_container"> <!-- this component template will not render without an outer container div -->
        <div v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<div class="site_container">
				<div class="header_content">
					<h1>E-Newsletter</h1>
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
                    <div id="cc_universal_code">
                    </div>
                </div>
            </div>
            <div class="padding_top_40"></div>    
        </div>
    </div>
</template>

<script>
    define(["Vue", "vuex", "jquery"], function(Vue, Vuex, $) {
        return Vue.component("newsletter-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dataloaded: false,
                    pageBanner: null,
                    currentPage: {},
                    email_addy: ""
                }
            },
            mounted () {
                if(!document.getElementById('signupScript')){
                    var script = document.createElement("script");
                    script.async = true;
                    script.defer = true;
                    script.src = "//static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js";
                    script.id = "signupScript"
                    document.getElementsByTagName("head")[0].appendChild(script);
                    
                    this.email_addy = this.$route.query.email;
                    $("#email_address_0").val(this.email_addy);
                }
            },
            watch : {
                $route () {
                    this.email_addy = this.$route.query.email;
                    $("#email_address_0").val(this.email_addy);
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

                    this.dataloaded = true;
                }); 
                this.$store.dispatch('LOAD_PAGE_DATA', { url: this.property.mm_host + "	/pages/sevenoaks-newsletter.json" }).then(response => {
                    this.currentPage = response.data;
                });
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
