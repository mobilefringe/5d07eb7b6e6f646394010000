<template>
    <div v-if="dataLoaded"> <!-- this component template will not render without an outer container div -->
    <!--<div class="page_container" id="contact_us_container"> -->
        <div  v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<div class="site_container">
				<div class="header_content">
					<h1>{{$t("newsletter_page.newsletter")}}</h1>
				</div>
			</div>
		</div>  
        <div class="site_container">
            <div class="row">
                <div class="col-md-12">
                    <div class="text-left contact_us_body" v-if="currentPage.body" v-html="currentPage.body"></div>
                </div>
                <div class="col-md-12 contact_contents">
                    <form class="form-horizontal js-cm-form" id="subForm" class="js-cm-form" action="https://www.createsend.com/t/subscribeerror?description=" method="post" data-id="92D4C54F0FEC16E5ADC2B1904DE9ED1AEC652151923F368AFF8F79BD97653D518B1251FC5BB09D7603C4AFEECA699B380141E6B93F1A28592DA91D0CB25CE7F2">
                        <div class="form-group ">
                            <div class="col-sm-6 col-xs-12" >
                                <label class="label" for="fieldName">{{$t("newsletter_page.name")}}</label>
                                <input v-model="form_data.name" required class="form-control" name="cm-name" type="text" placeholder="Name" id="fieldName">
                            </div>
                            <div class="col-sm-6 col-xs-12">
                                <label class="label" for="fieldEmail">{{$t("newsletter_page.email")}}</label>
                                <input v-model="form_data.email" required class="form-control js-cm-email-input" name="cm-ydjkad-ydjkad" type="email" placeholder="Email" id="fieldEmail">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12 margin_30">
    					        <label class="checkbox">
                                    <input name="agree_newsletter" required  type="checkbox">
                                       By submitting my email, I agree to receive Commercial Electronic Messages from Morguard, the management company of Sevenoaks Shopping Centre and its affiliates that will include: special retail sales offers, promotions, new retailer announcements, upcoming events, trend and style news and other inside information. You can unsubscribe at any time. shopsevenoaks.com Sevenoaks Shopping Centre 32900 South Fraser Way, Suite 201 Abbotsford, BC V2S 5A1
                                </label>
    					    </div>
    					</div>
    					<div class="form-group">
                            <div class="col-xs-12">
                                <button class="contest_btn js-cm-submit-button" type="submit" :disabled="formSuccess">{{$t("newsletter_page.subscribe")}}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="padding_top_40"></div>    
        </div>
    </div>
</template>
<style>
    .form-group label {
        display: inline-block;
    }
    .checkbox {
        font-weight: normal;
            margin-left: 20px;
    }
</style>
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", 'vee-validate', 'jquery', 'utility', 'campaignMonitor'], function(Vue, Vuex, moment, tz, VueMoment, VeeValidate, $, Utility, campaignMonitor) {
        Vue.use(VeeValidate);
        return Vue.component("newsletter-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dataLoaded: false,
                    pageBanner: null,
                    currentPage: {},
                    form_data : {},
                    formSuccess : false,
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
                    console.log("response", this.response)
                    // this.currentPage = response.data[1];
                    
                });    
            },
            mounted () {
                this.form_data.email = this.$route.query.email;
                $("#fieldEmail").val(this.form_data.email);
            },
            watch : {
                $route () {
                    this.form_data.email = this.$route.query.email;
                    $("#fieldEmail").val(this.form_data.email);
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findRepoByName'
                ])
            },
            methods: {
                validateBeforeSubmit(form) {
                    this.$validator.validateAll().then((result) => {
                        let errors = this.errors;
                        if (errors && errors.items.length == 0) { 
                            if (errors.length > 0) {
                                console.log("Error", errors);
                                this.formError = true;
                                form.preventDefault();
                                form.target.action = "";
                            } else {
                                this.campaignMonitorCall($('#subForm'), '92D4C54F0FEC16E5ADC2B1904DE9ED1AEC652151923F368AFF8F79BD97653D518B1251FC5BB09D7603C4AFEECA699B380141E6B93F1A28592DA91D0CB25CE7F2'); 
                            }
                        }
                    })
                },
                loadData: async function() {
                    try {
                        let results = await Promise.all([
                            this.$store.dispatch("getData", "repos"), 
                            this.$store.dispatch('LOAD_PAGE_DATA', { url: this.property.mm_host + "	/pages/sevenoaks-newsletter.json" })
                        ]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                campaignMonitorCall(form, form_data_id) {
                    // Get e-mail value.
                    var vm = this;
                    email = $('input[type=email]', form).val();
        
                    // Build request data for tokenRequest.
                    request_data = "email=" + encodeURIComponent(email) + "&data=" + form_data_id;
        
                    // Prepare tokenRequest.
                    tokenRequest = new XMLHttpRequest();
                    tokenRequest.open('POST', 'https://createsend.com//t/getsecuresubscribelink', true);
                    tokenRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    tokenRequest.send(request_data);
        
                    // Ready state.
                    tokenRequest.onreadystatechange = function() {
                        if (this.readyState === 4) {
                            if (this.status === 200) {
                                // Having token and new submit url we can create new request to subscribe a user.
                                subscribeRequest = new XMLHttpRequest();
                                subscribeRequest.open('POST', this.responseText, true);
                                subscribeRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                subscribeRequest.send(form.serialize());
                                // On ready state call response function.
                                subscribeRequest.onreadystatechange = function() {
                                    if (subscribeRequest.readyState === 4) {
                                        if (_.includes(subscribeRequest.response, 'Thank You')) {
                                            vm.formSuccess = true;
                                        } else {
                                            vm.formError = true;
                                        }
                                    }
                                }
                            } else {
                                return false;
                            }
                        }
                    }
                }
            }
        });
    });
</script>
