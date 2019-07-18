<template>
    <div class="page_container" id="contact_us_container"> <!-- without an outer container div this component template will not render -->
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
						<div class="form-group">
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
                		</div>
                	    <div class="form-group">
                			<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('birthday')}">
                				<label class="label" for="birthday">Child's Birthday <span class="req_star"> *</span></label>
                				<input v-model="form_data.birthday" class="form-control" v-validate="'required|date_format:MM/DD/YYYY'" :class="{'input': true}" name="cm-f-fjutut" type="text" placeholder="mm/dd/yyyy" data-vv-delay="500" data-vv-as="birthday" id="birthday" required>
                				<span v-show="errors.has('cm-f-fjutut')" class="form-control-feedback">{{ errors.first('cm-f-fjutut') }}</span>
                			</div>
                			<div class="col-sm-6 col-xs-12">
                			    <p class="kids_club_form_notice">Happy Kids Club is for kids 10 years of age and under</p>
                			</div>
                		</div>
						<div class="form-group">
						    <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('parent_first_name')}">
                				<label class="label" for="parent_first_name">Parent or Guardian First Name<span class="req_star"> *</span></label>
                				<input v-model="form_data.parent_first_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="parent_first_name" type="text" placeholder="First Name" data-vv-delay="500" data-vv-as="parent's first name" id="parent_first_name" required>
                				<span v-show="errors.has('parent_first_name')" class="form-control-feedback">{{ errors.first('parent_first_name') }}</span>
                			</div>
                			<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('parent_last_name')}">
                				<label class="label" for="parent_last_name">Parent or Guardian Last Name<span class="req_star"> *</span></label>
                				<input v-model="form_data.parent_last_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="parent_first_name" type="text" placeholder="Last Name" data-vv-delay="500" data-vv-as="parent's last name" id="parent_last_name" required>
                				<span v-show="errors.has('parent_last_name')" class="form-control-feedback">{{ errors.first('parent_last_name') }}</span>
                			</div>
                		</div>
						<div class="form-group">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">
								<label class="label" for="email">Parent or Guardian Email Address<span class="req_star"> *</span></label>
								<input v-model="form_data.email" v-validate="'required|email'" class="form-control js-cm-email-input" :class="{'input': true}" name="cm-vgldd-vgldd" type="email" placeholder="Email" data-vv-delay="500" data-vv-as="email" required>
								<span v-show="errors.has('cm-vgldd-vgldd')" class="form-control-feedback">{{ errors.first('cm-vgldd-vgldd') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('phone')}" >
								<label class="label" for="phone">Phone Number <span class="req_star"> *</span></label>
								<input v-model="form_data.phone" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-fjuthu" type="text" placeholder="Phone number" data-vv-delay="500" data-vv-as="phone" required>
								<span v-show="errors.has('cm-f-fjuthu')" class="form-control-feedback">{{ errors.first('cm-f-fjuthu') }}</span>
							</div>
						</div>
						<div class="form-group">
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
    define(["Vue", "vuex", "axios", "moment", "moment-timezone", 'vee-validate', 'utility'], function(Vue, Vuex,axios, moment, tz, VeeValidate, Utility) {
        Vue.use(VeeValidate);
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
                    currentPage: null,
                    formNotFilled: false
                }
            },
            created() {
                this.loadData().then(response => {
                    this.currentPage = response[0].data;
                    // this.currentContest = this.findContestBySlug('parklandmall-kids-club');
                    var temp_repo = this.findRepoByName('Kids Club Banner');
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
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findContestBySlug',
                    'findRepoByName'
                ])
            },
            methods: {
                loadData: async function() {
                    try {
                        var host = this.property.mm_host.replace("http:", "");
                        let results = await Promise.all([
                            this.$store.dispatch('LOAD_PAGE_DATA', { url: host + "/pages/sevenoaks-kids-club.json" }),
                            this.$store.dispatch("getData", "contests"),
                            this.$store.dispatch("getData", "repos")
                        ]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                validateBeforeSubmit(form) {
                    this.$validator.validateAll().then((result) => {
                        let errors = this.errors;
                        let mm_success = false;
                        if(errors && errors.items.length == 0){
                            //format contests data for MM
                            
                            var json_data = {};
                            json_data.child_first_name = this.form_data.child_first_name;
                            json_data.child_last_name = this.form_data.child_last_name;
                            json_data.child_age = this.form_data.child_age;
                            json_data.birthday = this.form_data.form_data.birthday;
                            json_data.guardian_first_name = this.form_data.parent_first_name; 
                            json_data.guardian_last_name = this.form_data.parent_last_name;
                            json_data.email = this.form_data.email;
                            json_data.phone = this.form_data.phone;
                            json_data.mailing_address = this.form_data.mailing_address;
                            json_data.city = this.form_data.city;
                            json_data.postal = this.form_data.postal_code;
                            var vm = this;
                            
                            //email contact data
                            var contact_form = {};
                            contact_form.send_to = "stephanie@mobilefringe.com;
                            contact_form.subject = "Kids Club";
                            var body = {};
                            body["Child Name"] = vm.form_data.child_first_name +  " " + vm.form_data.child_last_name;
                            body["Child Age"] = vm.form_data.child_age;
                            body["Child Birthday"] = vm.form_data.birthday;
                            body["Guardian Name"] = vm.form_data.parent_first_name + " " + vm.form_data.parent_last_name;
                            body["Email"] = vm.form_data.email;
                            body["Phone"] = vm.form_data.phone;
                            body["Mailing Address"] = vm.form_data.mailing_address;
                            body["City"] = vm.form_data.city;
                            body["Postal Code"] = vm.form_data.postal_code;
                            //cycling through children to send separete entries
                            _.times(vm.numberOfChildren, function(key) {
                                json_data["child"+(key+1)+"_name"] = vm.form_data["child_"+(key+1)].child_first_name + " "  +  vm.form_data["child_"+(key+1)].child_last_name;
                                json_data["child"+(key+1)+"_age"]= vm.form_data["child_"+(key+1)].age;
                                
                                body["Child"+(key+1)+" Name"] = vm.form_data["child_"+(key+1)].child_first_name + " "  +  vm.form_data["child_"+(key+1)].child_last_name;
                                body["Child"+(key+1)+" Age"] = vm.form_data["child_"+(key+1)].age;
                                
                                
                            });
                            //sending email
                            send_data = {};
                            send_data.url = "https://www.mallmaverick.com/send_contact_email";
                            send_data.form_data = JSON.stringify(Utility.serializeObject(contact_form));
                            contact_form.body = body;
                           
                            $.ajax({
                                url : send_data.url,
                                type: "POST",
                                data : contact_form,
                                success: function(data, textStatus, jqXHR){
                                    vm.formSuccess = true;
                                    var contest_entry = {};
                                    contest_entry.json = json_data;
                                    host_name = vm.property.mm_host.replace("http:", "");
                                    var url = host_name + "/contests/" + vm.currentContest.slug + "/json_entry";
                                    $.ajax({
                                        url: url,
                                        type: "POST",
                                        data: contest_entry,
                                        async: false,
                                        success: function(data) {
                                          console.log("mm post successful");
                                        },
                                        error: function(data){
                                            console.log("error data:" , data);
                                        }
                                    });
                                },
                                error: function (jqXHR, textStatus, errorThrown){
                                  console.log("Data load error: " + error.message);
                                  vm.formError = true;
                                }
                            });
                        }
                    })
                }
            }
        });
    });
</script>