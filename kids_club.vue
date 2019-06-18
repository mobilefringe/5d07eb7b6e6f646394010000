<template>
    <div class="page_container" id="contact_us_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<div class="site_container">
				<div class="header_content">
					<h1>Kids Club</h1>
				</div>
			</div>
		</div>
        <div class="site_container">
            <div class="row text-left">
                <div class="col-sm-12">
                    <div v-if="currentPage" v-html="currentPage.body"></div>
                </div>
            </div> 
            <div class="row"> 
                <div class="col-sm-12 contest_contents">
                    <form class="form-horizontal padding_top_20 js-cm-form" action="https://mobilefringe.createsend.com/t/d/s/vgldd/" method="post" v-on:submit.prevent="validateBeforeSubmit" id="kids_club">
						<div class="form-group " id="child_container">
						    <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('child_first_name')}">
                				<label class="label" for="child_first_name">Child's First Name <span class="req_star"> *</span></label>
                				<input v-model="form_data.child_first_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="child_first_name" type="text" placeholder="First Name" data-vv-delay="500" data-vv-as="child's first name" id="child_first_name" required>
                				<span v-show="errors.has('child_first_name')" class="form-control-feedback">{{ errors.first('child_first_name') }}</span>
                			</div>
                			<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('child_last_name')}">
                				<label class="label" for="child_last_name">Child's Last Name <span class="req_star"> *</span></label>
                				<input v-model="form_data.child_last_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="child_last_name" type="text" placeholder="Last Name" data-vv-delay="500" data-vv-as="child's last name" id="child_last_name" required>
                				<span v-show="errors.has('child_last_name')" class="form-control-feedback">{{ errors.first('child_last_name') }}</span>
                			</div>
                			<!--<input class="form-control" name="cm-name" type="hidden" :value="form_data.child_first_name + ' ' + form_data.child_last_name">-->
                			<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('birthday')}"   style="padding-top: 20px;">
                				<label class="label" for="birthday">Birthday <span class="req_star"> *</span></label>
                				<input v-model="form_data.birthday" class="form-control" v-validate="'required|date_format:MM/DD/YYYY'" :class="{'input': true}" name="cm-f-fjutut" type="text" placeholder="mm/dd/yyyy" data-vv-delay="500" data-vv-as="birthday" id="birthday" required>
                				<span v-show="errors.has('cm-f-fjutut')" class="form-control-feedback">{{ errors.first('cm-f-fjutut') }}</span>
                			</div>
                			<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('gender')}"  style="padding-top: 20px;">
                				<label class="label" for="gender">Gender <span class="req_star"> *</span></label>
                				<input style="display:none;" id="gender" name="cm-f-fjutkr" :value="form_data.gender">
                				<radio name="gender" value="male" v-model="form_data.gender" required>Male</radio>
                                <radio name="gender" value="female" v-model="form_data.gender" required>Female</radio>
                                <span v-if="genderError" class="form-control-feedback">Please choosed a gender</span>
                			</div>
                		</div>
						<div class="form-group">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">
								<label class="label" for="email">Parent's Email <span class="req_star"> *</span></label>
								<input v-model="form_data.email" v-validate="'required|email'" class="form-control js-cm-email-input" :class="{'input': true}" name="cm-vgldd-vgldd" type="email" placeholder="Email" data-vv-delay="500" data-vv-as="email" required>
								<span v-show="errors.has('cm-vgldd-vgldd')" class="form-control-feedback">{{ errors.first('cm-vgldd-vgldd') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('phone')}" >
								<label class="label" for="phone">Phone Number <span class="req_star"> *</span></label>
								<input v-model="form_data.phone" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-fjuthu" type="text" placeholder="Phone number" data-vv-delay="500" data-vv-as="phone" required>
								<span v-show="errors.has('cm-f-fjuthu')" class="form-control-feedback">{{ errors.first('cm-f-fjuthu') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12 " :class="{'has-error': errors.has('mailing_address')}"  style="padding-top: 20px;">
								<label class="label" for="mailing_address">Address <span class="req_star"> *</span></label>
								<input v-model="form_data.mailing_address" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-fjutkl" type="text" placeholder="Mailing Address" data-vv-delay="500" data-vv-as="mailing address" required>
								<span v-show="errors.has('cm-f-fjutkl')" class="form-control-feedback">{{ errors.first('cm-f-fjutkl') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12"  :class="{'has-error': errors.has('city')}" style="padding-top: 20px;">
								<label class="label" for="city"> City <span class="req_star"> *</span></label>
								<input v-model="form_data.city" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-fjutky" type="text" placeholder="Town/City" data-vv-delay="500" data-vv-as="city" required>
								<span v-show="errors.has('cm-f-fjutky')" class="form-control-feedback">{{ errors.first('cm-f-fjutky') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12 " :class="{'has-error': errors.has('postal')}"  style="padding-top: 20px;">
								<label class="label" for="postal">Postal Code <span class="req_star"> *</span></label>
								<input v-model="form_data.postal_code" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-fjutkj" type="text" placeholder="Postal Code" data-vv-delay="500" data-vv-as="postal code" required>
								<span v-show="errors.has('cm-f-fjutkj')" class="form-control-feedback">{{ errors.first('cm-f-fjutkj') }}</span>
							</div>
						</div>
						<div class="form-group account-btn text-left m-t-10 agreement">
						    <div class="col-xs-12">
						        <label class="checkbox">
                                    <input name="agree_to_receive" required type="checkbox" >
                                     Yes, I would like to receive Kids Club newsletters on behalf of my child.
                                </label>
						    </div>
						    <div class="col-xs-12">
						        <label class="checkbox">
                                    <input name="agree_terms" required type="checkbox" >
                                    I have read and understand Parkland Mall's <router-link to="/pages/parklandmall-terms-and-conditions-parkland-mall-kidz-club">terms and conditions.</router-link>
                                </label>
						    </div>
							<div class="col-xs-12" style="margin-top: 20px;">
								<button class="contest_btn" type="submit" :disabled="formSuccess">Submit</button>
							</div>
						</div>
					</form>
                    
                    <div id="send_contact_success" class="alert alert-success text-left" role="alert" v-show="formSuccess" style="margin-top: 20px;">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        <span class="sr-only">Success</span>
                        Thank you for subscribing.
                    </div>
                    <div id="send_contact_error" class="alert alert-danger text-left" role="alert" v-show="formError" style="margin-top: 20px;">
                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span class="sr-only">Error:</span>
                        There was an error when trying to submit your request. Please try again later.
                    </div>
                    <div id="send_form_error" class="alert alert-danger text-left" role="alert" v-show="formNotFilled" style="margin-top: 20px;">
                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span class="sr-only">Error:</span>
                            Please fill all required fields and try again!
                    </div>
                </div>
            </div>
            <div class="padding_top_40"></div>    
        </div>
    </div>
</template>

<script>
    define(["Vue", "vuex", "axios", "moment", "moment-timezone", "vue-moment", "vue-meta", 'vee-validate', 'utility', 'vue-checkbox-radio'], function(Vue, Vuex,axios, moment, tz, VueMoment, Meta, VeeValidate, Utility, CheckboxRadio) {
        Vue.use(VeeValidate);
        Vue.use(CheckboxRadio.default);
        return Vue.component("kids-club-component", {
            template: template, // the variable template will be injected
            props:['locale'],
            data: function() {
                return {
                    form_data: {},
                    formSuccess: false,
                    formError: false,
                    validaNum: '',
                    correctValNum: null,
                    validNumError: false,
                    currentContest: null,
                    pageBanner: null,
                    genderError : false,
                    currentPage: null,
                    formNotFilled: false
                }
            },
            created() {
                this.loadData().then(response => {
                    this.currentPage = response[0].data;
                    this.currentContest = this.findContestBySlug('parklandmall-kids-club');
                    var temp_repo = this.findRepoByName('Kidz Club');
                    if(temp_repo) {
                        this.pageBanner = temp_repo.images[0];
                    }
                    this.pageBanner = this.pageBanner;
                });
            },
            mounted() {
                //creating random validation num 
                this.correctValNum = Utility.rannumber();
                
            },
            watch: {
                form_data () {
                    if(this.form_data.gender !== null && this.form_data.gender !== undefined && this.form_data.gender.length > 0){
                        this.genderError = false;
                    }
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
                validateBeforeSubmit(form) {
                    if(this.form_data.gender == null || this.form_data.gender == undefined || this.form_data.gender.length == 0){
                        this.genderError = true;
                    }
                    this.$validator.validateAll().then((result) => {
                        let errors = this.errors;
                        let mm_success = false;
                        if(errors && errors.items.length == 0){
                            //format contests data for MM
                            var json_data = {};
                            json_data.child_first_name = this.form_data.child_first_name;
                            json_data.child_last_name = this.form_data.child_last_name;
                            json_data.child_birthday = this.form_data.birthday;
                            json_data.child_gender = this.form_data.gender;
                            json_data.parent_email = this.form_data.email;
                            json_data.phone = this.form_data.phone;
                            json_data.address = this.form_data.mailing_address;
                            json_data.city = this.form_data.city;
                            json_data.postal_code = this.form_data.postal_code;
                            var contest_entry = {};
                            contest_entry.json = json_data;
                            host_name = this.property.mm_host.replace("http:", "");
                            var url = host_name + "/contests/" + this.currentContest.slug + "/json_entry";
                            $.ajax({
                                url: url,
                                type: "POST",
                                data: contest_entry,
                                async: false,
                                success: function(data) {
                                    // vm.formSuccess = true;
                                   mm_success = true;
                                   console.log("mm post successful");
                                },
                                error: function(data){
                                    console.log("error data:" , data);
                                    mm_success = false;
                                }
                            });
                            if(mm_success) {
                                // return;
                                form.target.submit();
                                // this.campaignMonitorCall($('#kids_club'), '92D4C54F0FEC16E5ADC2B1904DE9ED1A986580DC6A3319628442A577C97C4456693086D5C481B009E96C7FD4BC0DC2C652A2FE59DB69EFC4F97AF377DCF262CF');
                                
                                
                            }
                            else {
                                this.formError = true;
                            }
                        }
                        else {
                            this.formNotFilled = true;
                        }
                    })
                },
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        var host = this.property.mm_host.replace("http:", "");
                        let results = await Promise.all([this.$store.dispatch('LOAD_PAGE_DATA', {url: host + "	/pages/sevenoaks-kids-club.json"}),this.$store.dispatch("getData", "contests"),this.$store.dispatch("getData", "repos")]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                incrementChildren () {
                    this.numberOfChildren = this.numberOfChildren + 1;
                    if (this.numberOfChildren == 2) {
                        this.showChild2 = true;
                    }
                    else if (this.numberOfChildren == 3) {
                        this.showChild3 = true;
                        this.noMoreChildren = true;
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
                                           
                                            // var mail_chimp_data = {};
                                            // mail_chimp_data.FNAME =  vm.form_data.child_first_name;
                                            // mail_chimp_data.LNAME =  vm.form_data.child_last_name;
                                            // mail_chimp_data.MMERGE3 = vm.form_data.birthday;
                                            // mail_chimp_data.EMAIL = vm.form_data.email;
                                            
                                            // $.ajax({
                                            //     url: '//parklandmall.us9.list-manage.com/subscribe/post-json?u=8efac4fed5f3b8120c4c4565a&amp;id=78ae0c8a53&c=?',
                                            //     type: "POST",
                                            //     data: Utility.serializeObject(mail_chimp_data),
                                            //     dataType: 'jsonp',
                                            //     async: false,
                                            //     success: function(data) {
                                            //       console.log("mailchimp post successful", data);
                                            //         if(data.result === "error") {
                                                        // vm.formError = true;
                                                    // }
                                                    // else {
                                            vm.formSuccess = true;
                                            //         }
                                                   
                                            //     },
                                            //     error: function(data){
                                            //         console.log("error data:" , data);
                                            //     }
                                            // });
                                            return true;
                                        } else {
                                            vm.formError = true;
                                            return false;
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