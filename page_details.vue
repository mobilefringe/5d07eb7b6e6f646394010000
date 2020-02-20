<template>
    <div v-if="currentPage">
        <div v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<div class="site_container">
				<div class="header_content">
					<h1>{{ currentPage.title }}</h1>
					<h2 style="display:none;">Scroll to  view page details</h2>
					<h3 style="display:none;">View page details</h3>
				</div>
			</div>
		</div>
		<div class="site_container inside_page_content page_content">
			<div class="row">
			    <div class="col-md-12">
                    <div class="page_body description_text text_left" v-html="currentPage.body"></div>
			    </div>
			</div>
			<div class="row padding_tb_50" v-if="subPages.length > 0">
                <div class="col-md-12">
                    <b-card v-for="(item, index) in subPages" :key="index" no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button block @click="item.show_tab = !item.show_tab; toggleOpen=!toggleOpen;" :class="item.show_tab ? 'collapsed' : null" :aria-controls="'tab-' + index" :aria-expanded="item.show_tab ? 'true' : 'false'" variant="info">
                                {{ item.title }}
                                <i v-if="item.show_tab"  class="fa fa-minus"></i>
                                <i v-else  class="fa fa-plus"></i>
                            </b-button>
                        </b-card-header>
                        <b-collapse v-model="item.show_tab" :id="'tab-' + index" :visible="item.show_tab" accordion="my-accordion" role="tabpanel" class="accordion_body">
                            <b-card-body>
                                <b-card-text>
                                    <div class="accordian-container" v-html="item.body"></div>
                                </b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </div>
            </div>  
        </div>
        <span style="visibility: hidden;width: 0;height: 0;display: inline-block;">{{ toggleOpen }}</span>
    </div>
</template>
<style>
    .page_title {
        /*border-top:1px solid #aea99e;*/
        border-bottom:1px solid #aea99e;
        height: 35px;
        line-height: 35px;
    }
    #pages_container img{
        width: 100%;
        height: auto;
    }
    .acc_title {
        margin-top:20px;
    }
    img {
        max-width: 100%;
    }
</style>
<script>
    define(["Vue", "vuex"], function(Vue, Vuex) {
        return Vue.component("page-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    pageBanner : null,
                    currentPage: null,
                    subPages: {},
                    toggleOpen: false,
                }
            },
            props:['id'],
            beforeRouteUpdate(to, from, next) {
                next();
                this.updatePageData(to.params.id);
            },
            created(){
               this.updatePageData(this.id);
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'findRepoByName'
                ])
            },
            methods: {
                loadData: async function(id) {
                    try {
                        let results = await Promise.all([
                            this.$store.dispatch('LOAD_PAGE_DATA', { url: this.property.mm_host + "/pages/" + this.id + ".json" }),
                            this.$store.dispatch("getData", "repos")
                        ]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                updatePageData (id) {
                    this.$nextTick(function() {
                        this.loadData(id).then(response => {
                            if (response == null || response == undefined) {
                                this.$router.replace('/');
                            } else {
                                this.currentPage = response[0].data;
                                if (response[0].data.subpages) {
                                    this.subPages = response[0].data.subpages;
                                }
                                
                                //Add custom banners for indivial pages 
                                var temp_repo = null;
                                if ( _.includes(id, 'community-programs')) {
                                    temp_repo = this.findRepoByName('Community Programs Banner');
                                } else if ( _.includes(id, 'gift-cards')) {
                                    temp_repo = this.findRepoByName('Gift Card Banner');
                                } else if ( _.includes(id, 'guest-services')) {
                                    temp_repo = this.findRepoByName('Guest Services Banner');
                                } else if ( _.includes(id, 'sevenoaks-leasing')) {
                                    temp_repo = this.findRepoByName('Leasing Banner');
                                } else {
                                    temp_repo = this.findRepoByName('Pages Banner');
                                }
                                
                                if (temp_repo && temp_repo.images) {
                                    this.pageBanner = temp_repo.images[0];
                                } else {
                                    this.pageBanner = {};
                                    this.pageBanner.image_url = "";
                                }
                            }
                        });    
                    });
                }
            }
        });
    });
</script>