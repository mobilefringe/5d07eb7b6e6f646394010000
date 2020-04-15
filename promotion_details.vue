<template>
	<div class="promo_dets_container" v-if="currentPromo">
		<div class="page_header" v-if="pageBanner" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<div class="site_container">
				<div class="header_content caps">
					<h1>Retailer Promotions</h1>
					<h2 style="display:none;">Scroll to  view promotion details</h2>
					<h3 style="display:none;">Scroll to  view promotion details</h3>
				</div>
			</div>
		</div>
		<div class="site_container">
			<div class="row">
			    <div class="col-md-12">
			        <p class="back_to_list"><i class="fa fa-angle-left"></i>&nbsp;<router-link to="/promotions">Back to Retailer Promotions List</router-link></p>
			    </div>
				<div class="col-sm-4 promo_logo_container hidden_phone">
					<div class="image_container details_store_image">
						<div v-if="currentPromo.store.no_store_logo" class="store_details_image center-block">
                            <div class="no_logo">
                                <img class="store_img" src="//assets.mallmaverick.com/system/site_images/photos/000/041/782/original/transparent_logo.png?1533845225" alt="">
                                <h2 class="store_details_name">{{ currentPromo.store.name }}</h2>
                            </div>    
                        </div>
                        <img v-else class="store_details_image center-block" :src="currentPromo.store.store_front_url_abs" :alt="currentPromo.store.name + ' Logo'" />
					</div>
					<div class="text-center">
					    <div v-if="currentPromo.promotionable_type == 'Store'">
						    <h4 class="event_store_name caps">{{currentPromo.store.name}}</h4>
						</div>
						<h4 v-if="currentPromo.store.phone" class="store_dets_title"> <a :href="'tel:'+currentPromo.store.phone">{{currentPromo.store.phone}}</a></h4>
						<h4 v-if="currentPromo.store.website" class="store_dets_title"> <a :href="'//'+currentPromo.store.website" target="_blank">Store Website</a></h4>
						<h4 v-if="storeHours.length > 0" class="store_dets_title">Store Hours</h4>
						<ul class="store_hours_list">
							<li v-if="storeHours" v-for="hour in storeHours" class="col-xs-12">
								<span class="col-xs-6 text-left">{{hour.day_of_week | moment("dddd", timezone)}}</span>
								<span class="col-xs-6 text-left">{{hour.open_time | moment("h A", timezone)}} - {{hour.close_time | moment("h A", timezone)}}</span>
							</li>
						</ul>
						<div class="store_dets_btn caps" v-if="currentPromo.promotionable_type == 'Store'">
							<router-link :to="'/stores/'+currentPromo.store.slug">Store Details & Location</router-link>
						</div>
					</div>
				</div>
				<div class="col-sm-8 promo_image_container text-left">
					<h3 class="promo_name">{{currentPromo.name}}</h3>
					<div v-if="currentPromo.promotionable_type == 'Store'" class="visible_phone">
					    <h4 class="event_store_name caps">{{currentPromo.store.name}}</h4>
					</div>
					<div class="promo_div_date">
					    <p v-if="isMultiDay(currentPromo)">{{ currentPromo.start_date | moment("MMMM D", timezone)}} - {{ currentPromo.end_date | moment("MMMM D", timezone)}}</p>
                        <p v-else>{{ currentPromo.start_date | moment("MMMM D", timezone)}}</p>
						<social-sharing :url="$root.shareURL('promotions',currentPromo.slug)" :title="currentPromo.title" :description="currentPromo.body" :quote="_.truncate(currentPromo.description, {'length': 99})" :twitter-user="$root.twitter_user" :media="currentPromo.image_url" inline-template >
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
					<img v-if="!_.includes(currentPromo.image_url, 'missing')" v-lazy="currentPromo.image_url" class="image" :alt="currentPromo.name"/>
					<div class="text-left promo_description">
						<p v-html="currentPromo.rich_description"></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    define(['Vue', 'vuex', 'moment', 'vue-lazy-load'], function(Vue, Vuex, moment, VueLazyload) {
        Vue.use(VueLazyload);
        return Vue.component("promo-details-component", {
            template: template, // the variable template will be injected,
            props:['id'],
            data: function() {
                return {
                    currentPromo: null,
                    storePromos : null,
                    storeHours : null,
                    pageBanner : null
                }
            },
            beforeRouteUpdate(to, from, next) {
                this.currentPromo = this.findPromoBySlug(to.params.id);
                    if (this.currentPromo === null || this.currentPromo === undefined){
                        this.$router.replace('/');
                    }
                next();
            },
            created(){
                this.loadData().then(response => {
                    this.updateCurrentPromo(this.id);
                    var temp_repo = this.findRepoByName('Promotions Banner');
                    if(temp_repo && temp_repo.images) {
                        this.pageBanner = temp_repo.images[0];
                    }
                    else {
                        this.pageBanner = {};
                        this.pageBanner.image_url = "";
                    }
                    this.promos = this.promotions;
                });
            },
            watch: {
                currentPromo : function (){
                    if(this.currentPromo != null) {
                        if (this.currentPromo.store  && _.includes(this.currentPromo.store.store_front_url_abs, 'missing')) {
                            // this.currentPromo.store.store_front_url_abs = this.property.default_logo_url;
                            this.currentPromo.store.no_store_logo = true;
                        }
                        else if (!this.currentPromo.store) {
                            this.currentPromo.store = {};
                            this.currentPromo.store.store_front_url_abs = this.property.default_logo_url;
                        }
                        // if ( _.includes(this.currentStore.store_front_url_abs, 'missing')) {
                        //   this.currentStore.no_store_logo = true;
                        // } else {
                        //   this.currentStore.no_store_logo = false;
                        // }
                        var vm = this;
                        var temp_promo = [];
                        var current_id =_.toNumber(this.currentPromo.id);
                        _.forEach(this.currentPromo.store.promotions, function(value, key) {
                            if(_.toNumber(value) != current_id){
                                var current_promo = vm.findPromoById(value);
                                current_promo.description_short = _.truncate(current_promo.description, {'length': 70});
                                temp_promo.push(current_promo);
                            }
                        });
                        this.storePromos = temp_promo;
                    }
                    if(this.currentPromo.store) {
                        var storeHours = [];
                        var vm = this;
                        _.forEach(this.currentPromo.store.store_hours, function (value, key) {
                            var hour = vm.findHourById(value);
                            if(hour.day_of_week === 0){
                                hour.order = 7;
                            }
                            else {
                                hour.order = hour.day_of_week;
                            }
                            storeHours.push();
                        });
                        this.storeHours = _.sortBy(storeHours, [function(o) { return o.order; }]);
                    }
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'processedPromos',
                    'findPromoBySlug',
                    'findPromoById',
                    'timezone',
                    'findRepoByName',
                    'findHourById'
                ]),
                allPromos() {
                    return this.processedPromos;
                },
            },
            methods: {
                loadData: async function() {
                    try {
                        let results = await Promise.all([
                            this.$store.dispatch("getData", "promotions"), 
                            this.$store.dispatch("getData", "repos")
                        ]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                 updateCurrentPromo (id) {
                    this.currentPromo = this.findPromoBySlug(id);
                    if (this.currentPromo === null || this.currentPromo === undefined){
                        this.$router.replace('/');
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
				}
            }
        });
    });
</script>