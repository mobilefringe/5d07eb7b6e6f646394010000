<template>
    <div v-if="dataLoaded" id="contact_us_container"> <!-- without an outer container div this component template will not render -->
        <div v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<div class="site_container">
				<div class="header_content">
					<h1>{{ $t("events_page.events") }}</h1>
				</div>
			</div>
		</div>
        <div class="site_container">
            <div class="row">
                <div class="col-sm-12 text-center">
                    <img :src='currentContest.image_url' alt="contest image" class="image"  v-if="locale=='en-ca'">
                    <img :src="'//mallmaverick.com' + currentContest.photo_2_url" alt="contest image" class="image"  v-else>
                </div>
            </div> 
            <div class="row"> 
                <div class="col-sm-12">
                    <h2 class="margin_40 center" v-if="locale=='en-ca'">{{ currentContest.name }}</h2>
                    <h2 class="margin_40 center" v-else>{{ currentContest.name_2 }}</h2>
                    <div class="description_text text_left" v-if="locale=='en-ca'" v-html="currentContest.rich_description"></div>
                    <div class="description_text text_left" v-else  v-html="currentContest.rich_description_2"></div>
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
								<input v-model="form_data.first_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="first_name" type="text" placeholder="First Name" data-vv-delay="500" data-vv-as="first name" required>
								<span v-show="errors.has('first_name')" class="form-control-feedback">{{ errors.first('first_name') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('last_name')}">
								<label class="label" for="last_name">Guardian's Last Name</label>
								<input v-model="form_data.last_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="last_name" type="text" placeholder="Last Name" data-vv-delay="500" data-vv-as="last name" required>
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
						    <!--<div class="col-xs-12">-->
						    <!--    <label class="checkbox">-->
          <!--                          <input name="agree_terms" required type="checkbox" >-->
          <!--                          I have read and agree to the <a href="/pages/eastgate-contest-rules-and-regulations" target="_blank">Rules & Regulations</a>.-->
          <!--                      </label>-->
						    <!--</div>-->
							<div class="col-xs-12">
								<button class="contest_btn" type="submit" :disabled="formSuccess">Submit</button>
							</div>
						</div>
					</form>
                    
                    <div id="send_contact_success" class="alert alert-success text-left" role="alert" v-show="formSuccess">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        <span class="sr-only">Success</span>
                        Thank you for contacting us. A member from our team will contact you shortly.
                    </div>
                    <div id="send_contact_error" class="alert alert-danger text-left" role="alert" v-show="formError">
                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span class="sr-only">Error:</span>
                        There was an error when trying to submit your request. Please try again later.
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
								<label class="label" for="birthday">Birthday</label>
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
						    <!--<div class="col-xs-12">-->
						    <!--    <label class="checkbox">-->
          <!--                          <input name="agree_terms" required type="checkbox" >-->
          <!--                          I have read and agree to the <a href="/pages/eastgate-contest-rules-and-regulations" target="_blank">Rules & Regulations</a>.-->
          <!--                      </label>-->
						    <!--</div>-->
							<div class="col-xs-12">
								<button class="contest_btn" type="submit" :disabled="formSuccess">Submit</button>
							</div>
						</div>
					</form>
                    
                    <div id="send_contact_success" class="alert alert-success text-left" role="alert" v-show="formSuccess">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        <span class="sr-only">Success</span>
                        Thank you for contacting us. A member from our team will contact you shortly.
                    </div>
                    <div id="send_contact_error" class="alert alert-danger text-left" role="alert" v-show="formError">
                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span class="sr-only">Error:</span>
                        There was an error when trying to submit your request. Please try again later.
                    </div>
                    
                </div>
            </div>
            <div class="row"> 
                <div class="col-sm-12 padding_top_40">
                    <hr>
                    <div class="description_text text_left" v-html="contestDisclaimer.body"></div>
                </div>
            </div>
            
            <div class="row" style="visibility:hidden;" >
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
                    // if (this.currentEvent === null || this.currentEvent === undefined){
                    //     this.$router.replace('/');
                    // }
                next();
            },
            watch: {
                currentContest : function (){
                    console.log("this", this.currentContest)
                    // if (this.currentEvent != null) {
                    //     if (this.currentEvent.store != null && this.currentEvent.store != undefined && _.includes(this.currentEvent.store.store_front_url_abs, 'missing')) {
                    //         this.currentEvent.store.store_front_url_abs = this.property.default_logo_url;
                    //     }
                    //     else if (this.currentEvent.store == null || this.currentEvent.store == undefined) {
                    //         this.currentEvent.store = {};
                    //         this.currentEvent.store.store_front_url_abs =  this.property.default_logo_url;
                    //     }
                    //     var vm = this;
                    //     var temp_event = [];
                    //     var current_id =_.toNumber(this.currentEvent.id);
                    //     _.forEach(this.currentEvent.store.event, function(value, key) {
                    //         if(_.toNumber(value) != current_id){
                    //             var current_event = vm.findEventById(value);
                    //             current_event.description_short = _.truncate(current_event.description, {'length': 70});
                    //             temp_event.push(current_event);
                    //         }
                    //     });
                    //     this.storeEvents = temp_event;
                    // }
                }
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
                    this.addCC_SCript();
                });
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
                validateBeforeSubmit() {
                    this.$validator.validateAll().then((result) => {
                        if (result) {
                            let errors = this.errors;
                            // Format contests data for MM
                            var contest_entry = {};
                            contest_entry.contest = this.form_data;
                            console.log("contest_entry.contest", contest_entry.contest)
                            var vm = this;
                            host_name = this.property.mm_host.replace("http:", "");
                            var url = host_name + "/contests/" + this.currentContest.slug + "/create_js_entry";
                            console.log("url", url)
                            $.ajax({
                                url: url,
                                type: "POST",
                                data: contest_entry,
                                success: function(data) {
                                    //post to constant contact 
                                    if(vm.form_data.agree_newsletter){
                                        $('#email_address_0').val(vm.form_data.email)  
                                        $('#first_name_0').val(vm.form_data.first_name)
                                        $('#last_name_0').val(vm.form_data.last_name)
                                        console.log( $('#email_address_0').val(),$('#first_name_0').val(),$('#last_name_0').val() )
                                        $('#ctct_form_0').submit();
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

                    })
                },
                addCC_SCript(){
                    var script = document.createElement("script");
            
                    script.async = true;
                    script.defer = true;
                    script.src = "//static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js";
                    script.id = "signupScript"
                    // document.getElementById('cc_universal_code').appendChild(script);
                    document.getElementsByTagName("head")[0].appendChild(script);
                }
            }
        });
    });
</script>