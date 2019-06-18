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
                			<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('child_age')}">
                				<label class="label" for="child_age">Child's Age <span class="req_star"> *</span></label>
                				<input v-model="form_data.child_age" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="child_age" type="text" placeholder="Last Name" data-vv-delay="500" data-vv-as="child's age" id="child_age" required>
                				<span v-show="errors.has('child_age')" class="form-control-feedback">{{ errors.first('child_age') }}</span>
                			</div>
                			<!--<input class="form-control" name="cm-name" type="hidden" :value="form_data.child_first_name + ' ' + form_data.child_last_name">-->
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
                                     Yes, I would like to receive Kidz Club newsletters on behalf of my child.
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
    define(["Vue", "vuex", "axios", "moment", "moment-timezone", 'vee-validate', 'utility', 'vue-checkbox-radio'], function(Vue, Vuex,axios, moment, tz, VeeValidate, Utility, CheckboxRadio) {
        Vue.use(VeeValidate);
        // Vue.use(CheckboxRadio.default);
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
                    var temp_repo = this.findRepoByName('Kids Club Banner');
                    if(temp_repo) {
                        this.pageBanner = temp_repo.images[0];
                    }
                    this.pageBanner = this.pageBanner;
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

            }
        });
    });
</script>