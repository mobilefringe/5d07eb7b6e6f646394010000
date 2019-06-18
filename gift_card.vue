<template>
    <div class="page_container" id="contact_us_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<div class="site_container">
				<div class="header_content">
					<h1>Gift Cards</h1>
				</div>
			</div>
		</div>
        <div class="site_container">
            <div class="row text-left">
                <div class="col-sm-12">
                    <div v-if="currentPage" v-html="currentPage.body"></div>
                </div>
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
                    // this.currentContest = this.findContestBySlug('parklandmall-kids-club');
                    var temp_repo = this.findRepoByName('Gift Card Banner');
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
                            json_data.child_age = this.form_data.age;
                            json_data.parent_first_name = this.form_data.parent_first_name;
                            json_data.parent_first_name = this.form_data.parent_first_name;
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
                        let results = await Promise.all([this.$store.dispatch('LOAD_PAGE_DATA', {url: host + "	/pages/sevenoaks-gift-cards.json"}),this.$store.dispatch("getData", "contests"),this.$store.dispatch("getData", "repos")]);
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