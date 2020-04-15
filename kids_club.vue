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
                    <hr>
                    <form class="form-horizontal padding_top_20 js-cm-form" action="form-submit" v-on:submit.prevent="validateBeforeSubmit">
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
                	    <div class="form-group flex_row">
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
                				<input v-model="form_data.parent_last_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="parent_last_name" type="text" placeholder="Last Name" data-vv-delay="500" data-vv-as="parent's last name" id="parent_last_name" required>
                				<span v-show="errors.has('parent_last_name')" class="form-control-feedback">{{ errors.first('parent_last_name') }}</span>
                			</div>
                		</div>
						<div class="form-group">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">
								<label class="label" for="email">Parent or Guardian Email Address<span class="req_star"> *</span></label>
								<input v-model="form_data.email" v-validate="'required|email'" class="form-control js-cm-email-input" :class="{'input': true}" name="cm-vgldd-vgldd" type="email" placeholder="Email Address" data-vv-delay="500" data-vv-as="parent's email address" required>
								<span v-show="errors.has('cm-vgldd-vgldd')" class="form-control-feedback">{{ errors.first('cm-vgldd-vgldd') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('phone')}" >
								<label class="label" for="phone">Parent or Guardian Phone Number <span class="req_star"> *</span></label>
								<input v-model="form_data.phone" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-fjuthu" type="text" placeholder="Phone Number" data-vv-delay="500" data-vv-as="parent's phone number" required>
								<span v-show="errors.has('cm-f-fjuthu')" class="form-control-feedback">{{ errors.first('cm-f-fjuthu') }}</span>
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-6 col-xs-12"  :class="{'has-error': errors.has('city')}">
								<label class="label" for="city"> City <span class="req_star"> *</span></label>
								<input v-model="form_data.city" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-fjutky" type="text" placeholder="Town/City" data-vv-delay="500" data-vv-as="city" required>
								<span v-show="errors.has('cm-f-fjutky')" class="form-control-feedback">{{ errors.first('cm-f-fjutky') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12 " :class="{'has-error': errors.has('postal')}">
								<label class="label" for="postal">Postal Code <span class="req_star"> *</span></label>
								<input v-model="form_data.postal_code" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-fjutkj" type="text" placeholder="Postal Code" data-vv-delay="500" data-vv-as="postal_code" required>
								<span v-show="errors.has('cm-f-fjutkj')" class="form-control-feedback">{{ errors.first('cm-f-fjutkj') }}</span>
							</div>
						</div>
						<hr>
						<div class="form-group">
							<div class="col-xs-12">
						        <div v-if="kidsClubDisclaimer" v-html="kidsClubDisclaimer.body"></div>
						    </div>
						</div>
						<hr>
						<div class="form-group text-left">
						    <div class="col-xs-12 margin_30" :class="{'has-error': errors.has('agree_terms')}">
						        <h4 class="margin_0 bold caps">Parent or Guardian:</h4>
						        <label class="checkbox">
                                    <input name="agree_terms" type="checkbox" v-model="form_data.agree_terms" v-validate="'required:true'" required>
                                    By checking the box, I acknowledge that I have read, understood, and accept the disclaimer and code of conduct listed above. 
                                </label>
						    </div>
						</div>
						<div class="form-group">
							<div class="col-xs-12">
								<button class="contest_btn" type="submit" :disabled="formSuccess">Submit</button>
							</div>
						</div>
					</form>
                    <div id="send_contact_success" class="alert alert-success text-left" role="alert" v-show="formSuccess" style="margin-top: 20px;">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        <span class="sr-only">Success</span>
                        Thank you for joining {{ property.name }} Kids Club. You'll hear from us soon.
                    </div>
                    <div id="send_contact_error" class="alert alert-danger text-left" role="alert" v-show="formError" style="margin-top: 20px;">
                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span class="sr-only">Error:</span>
                        There was an error when trying to submit your request. Please try again later.
                    </div>
                </div>
            </div>
            <div class="padding_top_40"></div>   
            <div class="row" style="visibility:hidden;height:1px;">
                <!-- Begin Constant Contact Inline Form Code -->
                <div class="ctct-inline-form" data-form-id="84f7d4fd-a9c0-4607-8e78-25e3c098ab60"></div>
                <!-- End Constant Contact Inline Form Code -->
            </div>
        </div>
    </div>
</template>

<style>
    hr {
        border-top: 1px solid #000;
    }
</style>
<script>
    define(["Vue", "vuex", "axios", "moment", "moment-timezone", 'vee-validate', 'utility'], function(Vue, Vuex,axios, moment, tz, VeeValidate, Utility) {
        Vue.use(VeeValidate);
        return Vue.component("kids-club-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    pageBanner: null,
                    currentContest: {},
                    currentPage: {},
                    kidsClubDisclaimer: {},
                    emailDisclaimer: "",
                    form_data: {},
                    formSuccess: false,
                    formError: false,
                    formNotFilled: false
                }
            },
            mounted(){
                if(!document.getElementById('signupScript')){
                    var script = document.createElement("script");
                    script.async = true;
                    script.defer = true;
                    script.src = "//static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js";
                    script.id = "signupScript"
                    document.getElementsByTagName("head")[0].appendChild(script);
                }
            },
            created() {
                this.loadData().then(response => {
                    var temp_repo = this.findRepoByName('Kids Club Banner');
                    if (temp_repo && temp_repo.images) {
                        this.pageBanner = temp_repo.images[0];
                    } else {
                        this.pageBanner = {};
                        this.pageBanner.image_url = "http://via.placeholder.com/1920x300";
                    }
                    
                    this.updateCurrentContest();
                    this.currentPage = response[2].data;
                    this.kidsClubDisclaimer = response[3].data;
                    this.emailDisclaimer = this.removeTags(this.kidsClubDisclaimer.body);
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findRepoByName',
                    'findContestBySlug'
                ])
            },
            methods: {
                loadData: async function() {
                    try {
                        var host = this.property.mm_host.replace("http:", "");
                        let results = await Promise.all([
                            this.$store.dispatch("getData", "repos"),
                            this.$store.dispatch("getData", "contests"),
                            this.$store.dispatch('LOAD_PAGE_DATA', { url: host + "/pages/sevenoaks-kids-club.json" }),
                            this.$store.dispatch('LOAD_PAGE_DATA', { url: host + "/pages/sevenoaks-kids-club-disclaimer.json" })
                        ]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                updateCurrentContest() {
                    this.currentContest = this.findContestBySlug("sevenoaks-kids-club");
                },
                removeTags(string) {
                    var first = string.replace(/<[^>]*>/g, ' ').trim();
                    var second = _.unescape(first);
                    return second
                },
                validateBeforeSubmit() {
                    this.$validator.validateAll().then((result) => {
                        if (result) {
                            let errors = this.errors;
                            this.form_data.entry_date = moment().format("MM/DD/YYYY");
                            
                            // Format email data
                            var contact_form = {};
                            contact_form.send_to = "sevenoaks@morguard.com";
                            contact_form.subject = "New Happy Kids Club Registration";
                            var body = {};
                            body["Child's First Name"] = this.form_data.child_first_name;
                            body["Child's Last Name"] = this.form_data.child_last_name;
                            body["Child's Birthday"] = this.form_data.birthday;
                            body["Parent/Guardian First Name"] = this.form_data.parent_first_name;
                            body["Parent/Guardian Last Name"] = this.form_data.parent_last_name;
                            body["Parent/Guardian Email Address"] = this.form_data.email;
                            body["Parent/Guardian Phone Number"] = this.form_data.phone;
                            body["City"] = this.form_data.city;
                            body["Postal Code"] = this.form_data.postal_code;
                            body["Date Submitted"] = this.form_data.entry_date;
                            body["Discalimer"] = this.emailDisclaimer;
            
                            // Sending email
                            var send_data = {};
                            send_data.url = "https://sevenoaks.mallmaverick.com/send_contact_email";
                            send_data.form_data = JSON.stringify(Utility.serializeObject(contact_form));
                            contact_form.body = body;
            
                            // Format contests data for MM
                            var contest_entry = {};
                            contest_entry.json = this.form_data;
                            var vm = this;
                            host_name = this.property.mm_host.replace("http:", "");
                            var url = host_name + "/contests/sevenoaks-kids-club/json_entry";
                            
                            $.ajax({
                                url : send_data.url,
                                type: "POST",
                                data : contact_form,
                                success: function(data, textStatus, jqXHR) {
                                    $.ajax({
                                        url: url,
                                        type: "POST",
                                        data: contest_entry,
                                        success: function(data) {
                                            //post to constant contact 
                                            $('#email_address_1').val(vm.form_data.email)  
                                            $('#first_name_1').val(vm.form_data.parent_first_name)
                                            $('#last_name_1').val(vm.form_data.parent_last_name)
                                            $('#ctct_form_1').submit();
         
                                            vm.formSuccess = true;
                                        },
                                        error: function(data){
                                            vm.formError = true;
                                        }
                                    });
                                },
                                error: function (jqXHR, textStatus, errorThrown){
                                    console.log("Data load error: " + error.message);
                                }
                            });
                        }
                    });
                }
            }
        });
    });
</script>