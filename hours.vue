<template>
    <div v-if="pageBanner"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<div class="site_container">
				<div class="header_content caps">
					<h1>Hours</h1>
					<h2 style="display:none;">Scroll to  view hours</h2>
				</div>
			</div>
		</div>  
        <div class="site_container">
            <div class="all_hours_container">
                <div class="row">
                    <div class="col-sm-5">
                        <h3 class="hours_heading text-left">Regular Shopping Hours</h3>
                        <div id="hours_container" class="hours_container">
                            <div class="hours_div text-left" v-for="hour in hours">
                                <span>{{ hour.day_of_week | moment("dddd", timezone) }}: </span>
                                <span>{{ hour.open_time | moment("h:mm A", timezone) }} - {{ hour.close_time | moment("h:mm A", timezone) }}</span>
                            </div>
                        </div>
                        <div class="text-left contact_us_body" v-html="currentPage.body"></div>
                    </div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-5">
                        <hr class="show_phone">
                        <h3 class="hours_heading text-left">Holiday Hours</h3>
                        <div id="holidays_hours_container" class="hours_container">
                            <div class="hours_div text-left" v-for="hour in reducedHolidays">
                                <span>{{ hour.holiday_name }} - {{ hour.holiday_date | moment("MMM D, YYYY", timezone) }}:</span>
                                <span class="opening_hours">{{ hour.open_time | moment("h:mm A", timezone) }} - {{hour.close_time | moment("h:mm A", timezone) }}</span>
                            </div>
                        </div>
                        <div v-if="closeHolidays.length > 0">
                            <h3 class="hours_heading text-left">Holiday Closures</h3>
                            <div id="closed_hours_container" class="hours_container">
                                <div class="hours_div text-left" v-for="hour in closeHolidays">
                                    <span>{{ hour.holiday_name }} - {{ hour.holiday_date | moment("MMM D YYYY", timezone) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="margin_40"></div>
            </div>
        </div>
    </div>
</template>
<style>
    .hours_page_container .row{
        margin-left:inherit;
    }
    hr {
        border-top: 1px solid #000;
    }
</style>
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment"], function(Vue, Vuex, moment, tz, VueMoment) {
        return Vue.component("hours-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    pageBanner : null,
                    currentPage: {}
                }
            },
            created() {
                this.loadData().then(response => {
                    var temp_repo = this.findRepoByName('Hours Banner');
                    if (temp_repo && temp_repo.images) {
                        this.pageBanner = temp_repo.images[0];
                    } else {
                        this.pageBanner= {};
                        this.pageBanner.image_url = "";
                    }
                });
                this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/sevenoaks-hours-disclaimer.json"}).then(response => {
                    this.currentPage = response.data;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'getPropertyHours',
                    'getPropertyHolidayHours',
                    'findRepoByName'
                ]),
                hours () {
                    // Attempt 1
                    // var hours = this.getPropertyHours;
                    // var ordered_hours = [];
                    // _.forEach(hours, function (val, key) {
                    //     if (val.day_of_week === 0){
                    //         val.order = 7;
                    //     } else {
                    //         val.order = val.day_of_week;
                    //     }
                    //     ordered_hours.push(val);
                    // });
                    // return _.sortBy(ordered_hours, [function(o) { return o.order; }]);
                    
                    
                    // Attempt 2
                    // var hours = _.sortBy(this.getPropertyHours, ['day_of_week']);
                    // // var hours = this.getPropertyHours
                    // var monday_start = [];
                    // var sunday = [];
                    // _.forEach(hours, function (val, key) {
                    //     if (val.day_of_week == 0) {
                    //         sunday.push(val);
                    //     } else {
                    //         monday_start.push(val);
                    //         console.log(monday_start)
                    //     }
                    // });
                    // return _.sortBy(this.getPropertyHours, ['day_of_week']);
                    // return _.concat(monday_start, sunday)
                    
                    // Live
                    var ordered_hours =  _.sortBy(_.filter(this.getPropertyHours,function(o){ return o.day_of_week !== 0}), ['day_of_week']);
                    var sunday = _.find(this.getPropertyHours,function(o){ return o.day_of_week === 0})
                    ordered_hours.push(sunday);
                    return ordered_hours
                    
                },
                holidayHours () {
                    return this.getPropertyHolidayHours;
                },
                reducedHolidays () {
                    var holidayHours = this.holidayHours;
                    return _.filter(holidayHours, function(o) { return !o.is_closed; });
                },
                closeHolidays () {
                    var holidayHours = this.holidayHours;
                    return _.sortBy(_.filter(holidayHours, function(o) { return o.is_closed; }), [function(o) { return o.holiday_date; }]);
                }
            },
            methods : {
                loadData: async function() {
                    try {
                        let results = await Promise.all([
                            this.$store.dispatch("getData", "repos")
                        ]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                }
            }
        });
    });
</script>
