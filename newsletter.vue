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
                    <form class="form-horizontal padding_top_20" action="form-submit" v-on:submit.prevent="validateBeforeSubmit">
						<div class="form-group ">
						    <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">
								<label class="label" for="email">Email</label>
								<input v-model="form_data.email" v-validate="'required|email'" class="form-control" :class="{'input': true}" name="email" type="email" placeholder="Email" data-vv-delay="500" data-vv-as="email">
								<span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('first_name')}">
								<label class="label" for="first_name">First Name</label>
								<input v-model="form_data.first_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="first_name" type="text" placeholder="First Name" data-vv-delay="500" data-vv-as="first name">
								<span v-show="errors.has('first_name')" class="form-control-feedback">{{ errors.first('first_name') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('last_name')}">
								<label class="label" for="last_name">Last Name</label>
								<input v-model="form_data.last_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="last_name" type="text" placeholder="Last Name" data-vv-delay="500" data-vv-as="last name">
								<span v-show="errors.has('last_name')" class="form-control-feedback">{{ errors.first('last_name') }}</span>
							</div>
						</div>
						<div class="form-group account-btn text-left m-t-10 agreement">
							<div class="col-xs-12" style="margin-top: 20px;padding: 0;">
								<button class="contest_btn" type="submit" :disabled="formSuccess">Submit</button>
							</div>
						</div>
					</form>
                    <div style="visibility:hidden;">
                        <!-- Begin Constant Contact Inline Form Code -->
                        <div class="ctct-inline-form" data-form-id="5d453944-e3ff-44bb-9b42-ee4243b38e96"></div>
                        <!-- End Constant Contact Inline Form Code -->
                    </div>
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
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", 'vee-validate', 'jquery', 'utility', 'constantContact'], function(Vue, Vuex, moment, tz, VueMoment, VeeValidate, $, Utility, constantContact) {
        Vue.use(VeeValidate);
        return Vue.component("newsletter-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dataloaded: false,
                    pageBanner: null,
                    currentPage: {},
                    form_data: {},
                    formSuccess: false,
                    formError: false,
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
                },
                validateBeforeSubmit() {
                    this.$validator.validateAll().then((result) => {
                        if (result &&  (this.correctValNum === this.validaNum)) {
                            let errors = this.errors;
                            this.validNumError = false;
                            
                            //format contests data for MM
                            var contest_entry = {};
                            contest_entry.contest = this.form_data;
                            var vm = this;
                            host_name = this.property.mm_host.replace("http:", "");
                            var url = host_name + "/contests/" + this.currentContest.slug + "/create_js_entry";
                            $.ajax({
                                url: url,
                                type: "POST",
                                data: contest_entry,
                                success: function(data) {
                                    vm.formSuccess = true;
                                },
                                error: function(data){
                                    vm.formError = true;
                                }
                            });
                        }

                    })
                },
            }
        });
    });
</script>
