<template>
    <div v-if="dataLoaded" id="contact_us_container" class="event_dets_container"> <!-- without an outer container div this component template will not render -->
        <div v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<div class="site_container">
				<div class="header_content">
					<h1>Events & Contests</h1>
				</div>
			</div>
		</div>
        <div class="site_container">
            <div class="row">
			    <div class="col-md-12">
			        <p class="back_to_list"><i class="fa fa-angle-left"></i>&nbsp;<router-link to="/events-and-contests">{{$t("events_page.back_to_events")}}</router-link></p>
			    </div>
				<div class="col-sm-12">
					<h3 class="promo_name" v-if="locale=='en-ca'">{{ currentContest.name }}</h3>
					<h3 class="promo_name" v-else>{{ currentContest.name_2 }}</h3>
					<div class="promo_div_date">
						<p v-if="isMultiDay(currentContest)">{{ currentContest.start_date | moment("MMMM D, YYYY", timezone)}} - {{ currentContest.end_date | moment("MMMM D, YYYY", timezone)}}</p>
                        <p v-else>{{ currentContest.start_date | moment("MMMM D, YYYY", timezone)}}</p>
						<social-sharing :url="$root.shareURL('events', currentContest.slug)" :title="currentContest.title" :description="currentContest.body" :quote="_.truncate(currentContest.description, {'length': 99})" :twitter-user="$root.twitter_user" :media="currentContest.image_url" inline-template >
							<div class="blog-social-share pull-right">
								<div class="social_share">
									<network network="facebook">
										<i class="fa fa-facebook social_icons" aria-hidden="true"></i>
									</network>
									<network network="twitter">
										<i class="fa fa-twitter social_icons" aria-hidden="true"></i>
									</network>
								</div>
							</div>
						</social-sharing>
					</div>
					<img v-if="!_.includes(currentContest.image_url, 'missing')" :src="currentContest.image_url" class="image" :alt="currentContest.name"/>
					<div class="text-left promo_description">
						<p v-if="locale=='en-ca'" v-html="currentContest.rich_description"></p>
						<p v-else v-html="currentContest.rich_description_2"></p>
					</div>
					<hr>
				</div>
			</div>
            <div v-if="kidsClubForm" class="row"> 
                <div class="col-sm-12">
                    <form class="form-horizontal" action="form-submit" v-on:submit.prevent="validateBeforeSubmit">
						<div class="form-group ">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('child_first_name')}">
								<label class="label" for="first_name">Child's First Name</label>
								<input v-model="form_data.child_first_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="child_first_name" type="text" placeholder="Child's First Name" data-vv-delay="500" data-vv-as="Child's First Name" required>
								<span v-show="errors.has('child_first_name')" class="form-control-feedback">{{ errors.first('child_first_name') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('child_last_name')}">
								<label class="label" for="last_name">Child's Last Name</label>
								<input v-model="form_data.child_last_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="child_last_name" type="text" placeholder="Child's Last Name" data-vv-delay="500" data-vv-as="Child's Last Name" required>
								<span v-show="errors.has('child_last_name')" class="form-control-feedback">{{ errors.first('child_last_name') }}</span>
							</div>
						</div>
						<div class="form-group ">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('first_name')}">
								<label class="label" for="first_name">Guardian's First Name</label>
								<input v-model="form_data.first_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="first_name" type="text" placeholder="First Name" data-vv-delay="500" data-vv-as="Guardian's First Name" required>
								<span v-show="errors.has('first_name')" class="form-control-feedback">{{ errors.first('first_name') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('last_name')}">
								<label class="label" for="last_name">Guardian's Last Name</label>
								<input v-model="form_data.last_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="last_name" type="text" placeholder="Last Name" data-vv-delay="500" data-vv-as="Guardian's Last Name" required>
								<span v-show="errors.has('last_name')" class="form-control-feedback">{{ errors.first('last_name') }}</span>
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">
								<label class="label" for="email">Email Address</label>
								<input v-model="form_data.email" v-validate="'required|email'" class="form-control" :class="{'input': true}" name="email" type="email" placeholder="Email Address" data-vv-delay="500" data-vv-as="email" required>
								<span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('phone')}" >
								<label class="label" for="phone">Phone Number</label>
								<input v-model="form_data.phone" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="phone" type="text" placeholder="Phone Number" data-vv-delay="500" data-vv-as="phone" required>
								<span v-show="errors.has('phone')" class="form-control-feedback">{{ errors.first('phone') }}</span>
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-6 col-xs-12 " :class="{'has-error': errors.has('postal')}">
								<label class="label" for="postal">Postal Code</label>
								<input v-model="form_data.postal_code" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="postal" type="text" placeholder="Postal Code" data-vv-delay="500" data-vv-as="postal code" required>
								<span v-show="errors.has('postal')" class="form-control-feedback">{{ errors.first('postal') }}</span>
							</div>
						</div>
						<div class="form-group">
						    <div class="col-xs-12" :class="{'has-error': errors.has('agree_newsletter')}">
						        <label class="checkbox">
                                    <input name="agree_newsletter" type="checkbox" v-model="form_data.agree_newsletter">
                                    Yes, I would like to sign-up for {{ property.name }} eNewsletter.
                                </label>
						    </div>
						    <div class="col-xs-12 margin_30" :class="{'has-error': errors.has('agree_terms')}">
						        <label class="checkbox">
                                    <input name="agree_terms" type="checkbox" v-model="form_data.agree_terms" v-validate="'required:true'" required>
                                    Yes, I have read and agree to the contest <a :href="currentContest.rules_and_regs" target="_blank">Rules & Regulations</a>. 
                                </label>
						    </div>
						</div>
						<div class="form-group">
							<div class="col-xs-12">
								<button class="contest_btn" type="submit" :disabled="formSuccess">Submit</button>
							</div>
						</div>
					</form>
                    <div id="send_contact_success" class="alert alert-success text-left" role="alert" v-show="formSuccess">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        <span class="sr-only">Success</span>
                        Your ballot has been received. Thanks for entering and good luck!
                    </div>
                    <div id="send_contact_error" class="alert alert-danger text-left" role="alert" v-show="formError">
                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span class="sr-only">Error:</span>
                        There was an error when trying to submit your ballot. Please try again later.
                    </div>
                </div>
            </div>
            <div v-else class="row"> 
                <div class="col-sm-12">
                    <form class="form-horizontal" action="form-submit" v-on:submit.prevent="validateBeforeSubmit">
						<div class="form-group ">
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
						<div class="form-group">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">
								<label class="label" for="email">Email Address</label>
								<input v-model="form_data.email" v-validate="'required|email'" class="form-control" :class="{'input': true}" name="email" type="email" placeholder="Email Address" data-vv-delay="500" data-vv-as="email">
								<span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('phone')}" >
								<label class="label" for="phone">Phone Number</label>
								<input v-model="form_data.phone" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="phone" type="text" placeholder="Phone Number" data-vv-delay="500" data-vv-as="phone">
								<span v-show="errors.has('phone')" class="form-control-feedback">{{ errors.first('phone') }}</span>
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-6 col-xs-12 " :class="{'has-error': errors.has('postal')}">
								<label class="label" for="postal">Postal Code</label>
								<input v-model="form_data.postal_code" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="postal" type="text" placeholder="Postal Code" data-vv-delay="500" data-vv-as="postal code">
								<span v-show="errors.has('postal')" class="form-control-feedback">{{ errors.first('postal') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('birthday')}">
								<label class="label" for="birthday">Birthday (You must be 19 years of age to enter)</label>
								<input v-model="form_data.birthday" class="form-control" v-validate="'required|date_format:DD/MM/YYYY'" :class="{'input': true}" name="birthday" type="text" placeholder="DD/MM/YYYY" data-vv-delay="500" data-vv-as="birthday">
								<span v-show="errors.has('birthday')" class="form-control-feedback">{{ errors.first('birthday') }}</span>
							</div>
						</div>
						<div class="form-group">
						    <div class="col-xs-12" :class="{'has-error': errors.has('agree_newsletter')}">
						        <label class="checkbox">
                                    <input name="agree_newsletter" type="checkbox" v-model="form_data.agree_newsletter">
                                    Yes, I would like to sign-up for {{ property.name }} eNewsletter.
                                </label>
						    </div>
						    <div class="col-xs-12 margin_30" :class="{'has-error': errors.has('agree_terms')}">
						        <label class="checkbox">
                                    <input name="agree_terms" type="checkbox" v-model="form_data.agree_terms" v-validate="'required:true'" required>
                                    Yes, I have read and agree to the contest <a :href="currentContest.rules_and_regs" target="_blank">Rules & Regulations</a>. 
                                </label>
						    </div>
						</div>
						<div class="form-group">
							<div class="col-xs-12">
								<button class="contest_btn" type="submit" :disabled="formSuccess">Submit</button>
							</div>
						</div>
					</form>
                    <div id="send_contact_success" class="alert alert-success text-left" role="alert" v-show="formSuccess">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        <span class="sr-only">Success</span>
                        Your ballot has been received. Thanks for entering and good luck!
                    </div>
                    <div id="send_contact_error" class="alert alert-danger text-left" role="alert" v-show="formError">
                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span class="sr-only">Error:</span>
                        There was an error when trying to submit your ballot. Please try again later.
                    </div>
                </div>
            </div>
            <div class="row"> 
                <div class="col-sm-12 padding_top_40">
                    <hr>
                    <div class="description_text text_left" v-html="contestDisclaimer.body"></div>
                </div>
            </div>
            <div class="row" style="visibility:hidden;height:1px;">
                <!-- Begin Constant Contact Inline Form Code -->
                <div v-if="kidsClubForm" class="ctct-inline-form" data-form-id="84f7d4fd-a9c0-4607-8e78-25e3c098ab60"></div>
                <!-- End Constant Contact Inline Form Code -->
                <!-- Begin Constant Contact Inline Form Code -->
                <div v-else class="ctct-inline-form" data-form-id="5d453944-e3ff-44bb-9b42-ee4243b38e96"></div>
                <!-- End Constant Contact Inline Form Code -->
            </div>
            <div class="padding_top_40"></div>    
        </div>
    </div>
</template>

<style>
    hr {
        border-top: 1px solid #000;
    }
    .form-group {
        margin-bottom: 0;
    }

    .agreement.form-group {
        margin:0;   
    }
    .checkbox {
        font-weight: normal;
    }
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
    define(['Vue', 'vuex', 'axios', 'moment', 'moment-timezone', 'vue-moment', 'vee-validate', 'v-calendar', 'utility'], function(Vue, Vuex, axios, moment, tz, VueMoment, VeeValidate, VCalendar, Utility) {
        Vue.use(VeeValidate);
        Vue.use(VCalendar.default);

        return Vue.component("contest-component", {
            template: template, // the variable template will be injected
            props:['locale'],
            data: function() {
                return {
                    dataLoaded: false,
                    pageBanner: null,
                    currentContest: {},
                    kidsClubForm: false,
                    contestDisclaimer: {},
                    form_data: {},
                    formSuccess: false,
                    formError: false
                }
            },
            props:['id', 'locale'],
            beforeRouteUpdate(to, from, next) {
                this.updateCurrentContest('to.params.id');
                next();
            },
            created() {
                this.loadData().then(response => {
                    var temp_repo = this.findRepoByName('Events & Contests Banner');
                    if (temp_repo && temp_repo.images) {
                        this.pageBanner = temp_repo.images[0];
                    } else {
                        this.pageBanner = {};
                        this.pageBanner.image_url = "http://via.placeholder.com/1920x300";
                    }
                    
                    this.contestDisclaimer = response[2].data;
                    this.updateCurrentContest(this.id);

                    this.dataLoaded = true;
                });
            },
            mounted(){
                if(!document.getElementById('signupScript')){
                    var script = document.createElement("script");
                    script.async = true;
                    script.defer = true;
                    script.src = "//static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js";
                    script.id = "signupScript"
                    // document.getElementById('cc_universal_code').appendChild(script);
                    document.getElementsByTagName("head")[0].appendChild(script);
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findContestBySlug',
                    'findRepoByName'
                ])
            },
            methods: {
                loadData: async function(id) {
                    try {
                        let results = await Promise.all([
                            this.$store.dispatch("getData", "repos"),
                            this.$store.dispatch("getData", "contests"),
                            this.$store.dispatch('LOAD_PAGE_DATA', { url: this.property.mm_host + "/pages/sevenoaks-contest-disclaimer.json" }),
                        ]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                updateCurrentContest (id) {
                    this.currentContest = this.findContestBySlug(id);
                    if (this.currentContest != null) {
                        console.log("this", this.currentContest)
                        if (this.currentContest.is_featured) {
                            this.kidsClubForm = true;
                        } else {
                            this.kidsClubForm = false;
                        }
                    }
                },
                isMultiDay(currentPromo) {
					var timezone = this.timezone
					var start_date = moment(currentPromo.start_date).tz(timezone).format("MM-DD-YYYY")
					var end_date = moment(currentPromo.end_date).tz(timezone).format("MM-DD-YYYY")
					if (start_date === end_date) {
						return false
					} else {
						return true
					}
				},
                validateBeforeSubmit() {
                    this.$validator.validateAll().then((result) => {
                        if (result) {
                            let errors = this.errors;
                            // Format contests data for MM
                            var contest_entry = {};
                            contest_entry.json = this.form_data;
                            console.log("contest_entry.contest", contest_entry.contest)
                            var vm = this;
                            host_name = this.property.mm_host.replace("http:", "");
                            var url = host_name + "/contests/" + this.currentContest.slug + "/json_entry";
                            console.log("url", url)
                            $.ajax({
                                url: url,
                                type: "POST",
                                data: contest_entry,
                                success: function(data) {
                                    //post to constant contact 
                                    if (vm.form_data.agree_newsletter) {
                                        if (vm.kidsClubForm) {
                                            $('#email_address_1').val(vm.form_data.email)  
                                            $('#first_name_1').val(vm.form_data.first_name)
                                            $('#last_name_1').val(vm.form_data.last_name)
                                            $('#ctct_form_1').submit();
                                        } else {
                                            $('#email_address_0').val(vm.form_data.email)  
                                            $('#first_name_0').val(vm.form_data.first_name)
                                            $('#last_name_0').val(vm.form_data.last_name)
                                            $('#ctct_form_0').submit();
                                        }
                                        vm.formSuccess = true;
                                    } else {
                                        vm.formSuccess = true;
                                    }
                                },
                                error: function(data){
                                    vm.formError = true;
                                }
                            });
                        }
                    });
                }
            }
        });
    });
</script>