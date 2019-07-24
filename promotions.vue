<template>
	<div v-if="dataloaded">
		<div class="page_header" v-if="pageBanner" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<div class="site_container">
				<div class="header_content caps">
					<h1>{{$t("promos_page.promotions")}}</h1>
					<h2 style="display:none;">Scroll to  view promotions</h2>
					<h3 style="display:none;">View all promotions below</h3>
				</div>
			</div>
		</div>
		<div class="site_container page_content" id="events_container">
			<div  v-if="promos.length > 0">
				<div class="row event_container" v-if="showMore > index" v-for="(promo,index) in promos">
					<div class="col-sm-6 col-md-3 event_image_container" style="max-width:100%">
						<div class="image_container details_store_image">
							<div v-if="!checkImageURL(promo)" class="store_details_image center-block">
                                <div class="no_logo">
                                    <img class="store_img" src="//www.mallmaverick.com/system/site_images/photos/000/041/782/original/transparent_logo.png?1533845225" alt="">
                                    <h2 class="store_details_name">{{ promo.store.name }}</h2>
                                </div>    
                            </div>
                            <img v-else class="center-block" :src="checkImageURL(promo)" :alt="promo.name" />
                        </div>
					</div>
					<div class="col-sm-6 col-md-8 event_dets_container">
						<h4 class="event_name caps" v-if="locale=='en-ca'">{{promo.name}}</h4>
						<h4 class="event_name caps" v-else>{{promo.name_2}}</h4>
						<div v-if="promo.promotionable_type == 'Store'">
						    <h4 class="event_store_name caps" v-if="locale=='en-ca'">{{promo.store.name}}</h4>
						    <h4 class="event_store_name caps" v-else>{{promo.store.name_2}}</h4>
						</div>
						<p class="event_dates" v-if="isMultiDay(promo)">{{ promo.start_date | moment("MMMM D", timezone)}} - {{ promo.end_date | moment("MMMM D", timezone)}}</p>
                        <p class="event_dates" v-else>{{ promo.start_date | moment("MMMM D", timezone)}}</p>
						<p class="event_desc"  v-if="locale=='en-ca'" >{{promo.description_short}}</p>
						<p class="event_desc" v-else>{{promo.description_short_2}}</p>
					
						<div class="text-right col-md-6 col-sm-12 promo_link" v-if="promo">
							<router-link :to="'/promotions/'+ promo.slug" class="event_learn_more pull-left"  :aria="promo.name">
							   {{$t("promos_page.read_more")}} <i class="fa fa-angle-right" aria-hidden="true"></i>
						    </router-link>
							<social-sharing :url="$root.shareURL('promotions',promo.slug)" :title="promo.title" :description="promo.body" :quote="_.truncate(promo.description, {'length': 99})" :twitter-user="$root.twitter_user" :media="promo.image_url" inline-template >
								<div class="blog-social-share pull_right">
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
					</div>
					<div class="col-sm-12">
						<hr>
					</div>
				</div>
			</div>
			<div id="no_events" class="row" v-else>
				<div class="col-md-12">
					<p>{{$t("promos_page.no_promo_message")}}</p>
				</div>
			</div>
			<div class="show_more"  v-if="promos && showMore < promos.length">
                <div class="pointer" @click="loadMoreItems()">{{$t("promos_page.more_promos")}}</div>
            </div>
		</div>
	</div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment"], function(Vue, Vuex, moment, tz, VueMoment) {
        return Vue.component("promos-component", {
            template: template, // the variable template will be injected
            props:['locale'],
            data: function() {
                return {
                    selectedDate: null,
                    filteredPromos:[],
                    dataloaded: false,
                    pageBanner: null,
                    promos : null,
                    incrementBy: 5,
                    showMore: 5
                }
            },
            created() {
                this.loadData().then(response => {
                    var temp_repo = this.findRepoByName('Promotions Banner');
                    if (temp_repo && temp_repo.images) {
                        this.pageBanner = temp_repo.images[0];
                    } else {
                        this.pageBanner = {};
                        this.pageBanner.image_url = "";
                    }
                    this.promos = this.promotions;
                    
                    this.dataloaded = true;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedPromos',
                    'findRepoByName',
                ]),
                promotions() {
                    var vm = this;
                    var temp_promo = [];
                    _.forEach(this.processedPromos, function(value, key) {
                        today = moment().tz(vm.timezone);
                        webDate = moment(value.show_on_web_date).tz(vm.timezone);
                        if (today >= webDate) {
                            value.description_short = _.truncate(value.description, {
                                'length': 150
                            });
                            value.description_short_2 = _.truncate(value.description_2, {
                                'length': 150
                            });
                            // if (value.store != null && value.store != undefined && _.includes(value.store.store_front_url_abs, 'missing')) {
                            //     value.store.store_front_url_abs = vm.property.default_logo_url;
                            // }
                            // else if (value.store == null || value.store == undefined) {
                            //     value.store = {};
                            //     value.store.store_front_url_abs =  vm.property.default_logo_url;
                            // }
                            // if (value.store  && _.includes(value.store.store_front_url_abs, 'missing')) {
                            //     // this.currentPromo.store.store_front_url_abs = this.property.default_logo_url;
                            //     value.store.no_store_logo = true;
                            // }
                            // else if (!value.store) {
                            //     value.store = {};
                            //     value.store.store_front_url_abs = vm.property.default_logo_url;
                            // }
                            temp_promo.push(value);
                        }
                    });
                    temp_promo = _.sortBy(temp_promo, ['end_date']);
                    return temp_promo;
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
                loadMoreItems() {
                  if (this.showMore <= this.promos.length) {
                    var num = this.showMore + this.incrementBy;
                    this.showMore = num;
                  }
                },
                isMultiDay(item) {
					var timezone = this.timezone
					var start_date = moment(item.start_date).tz(timezone).format("MM-DD-YYYY")
					var end_date = moment(item.end_date).tz(timezone).format("MM-DD-YYYY")
					if (start_date === end_date) {
						return false
					} else {
						return true
					}
				},
                checkImageURL(value) {
                    if (_.includes(value.image_url, "missing")) {
                        if (value.store === null || value.store === undefined) {
                            return this.property.default_logo_url;
                        } else if (
                            value.store != null &&
                            value.store != undefined &&
                            _.includes(value.store.store_front_url_abs, "missing")
                        ) {
                            return null;
                        } else {
                            return value.store.store_front_url_abs;
                        }
                    } else {
                        return value.promo_image_url_abs;
                    }
                }
            }
        });
    });
</script>