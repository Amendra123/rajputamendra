import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignDashComponent } from './dashboard-collections/campaign-dash/campaign-dash.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsumerDropComponent } from './dashboard-collections/consumer-drop/consumer-drop.component';
// import { CampaignDashboardComponent } from './dashboard-collections/campaign-dashboard/campaign-dashboard.component';
import { ConsumerPlanDistributionComponent } from './dashboard-collections/consumer-plan-distribution/consumer-plan-distribution.component';
import { Top5CampaignComponent } from './dashboard-collections/top5-campaign/top5-campaign.component';
import { Top5CompetitionComponent } from './dashboard-collections/top5-competition/top5-competition.component';
import { TrafficDistributionComponent } from './dashboard-collections/traffic-distribution/traffic-distribution.component';
import { CampaignListDataComponent } from './dashboard-collections/campaign-list-data/campaign-list-data.component';
import { ClientDashboardComponent } from './dashboard-collections/client-dashboard/client-dashboard.component';
import { AffiliateDashbordComponent } from './dashboard-collections/affiliate-dashbord/affiliate-dashbord.component';
import { CommingSoonComponent } from './dashboard-collections/comming-soon/comming-soon.component';
import { Top5CompetitionListComponent } from './dashboard-collections/top5-competition-list/top5-competition-list.component';
import { ConsumerPlanDistListComponent } from './dashboard-collections/consumer-plan-dist-list/consumer-plan-dist-list.component';
import { ConsumerDropListComponent } from './dashboard-collections/consumer-drop-list/consumer-drop-list.component';
import { TopFiveCampaignListComponent } from './dashboard-collections/top-five-campaign-list/top-five-campaign-list.component';
import { TrafficOrganicListComponent } from './dashboard-collections/traffic-organic-list/traffic-organic-list.component';
import { CampaignRevenueListComponent } from './dashboard-collections/campaign-revenue-list/campaign-revenue-list.component';

import { CampaignDashboardComponent } from './dashboard-collections/campaign-dashboard/campaign-dashboard.component';
import { DemographicComponent } from './dashboard-collections/coming-soon/demographic/demographic.component';
import { PersonaComponent } from './dashboard-collections/coming-soon/persona/persona.component';
import { KeywordBasedComponent } from './dashboard-collections/coming-soon/keyword-based/keyword-based.component';
import { KnowAudiencePersonaComponent } from './dashboard-collections/coming-soon/know-audience-persona/know-audience-persona.component';
import { KnowAudienceKeywordComponent } from './dashboard-collections/coming-soon/know-audience-keyword/know-audience-keyword.component';

import { KnowAudienceDemographicComponent } from './dashboard-collections/coming-soon/know-audience-demographic/know-audience-demographic.component';

import { ReachAudienceL1Component } from './dashboard-collections/coming-soon/reach-audience-l1/reach-audience-l1.component';
import { ReachAudienceL2Component } from './dashboard-collections/coming-soon/reach-audience-l2/reach-audience-l2.component';
import { InsightsComponent } from './dashboard-collections/coming-soon/insights/insights.component';
import { NotificationDetailComponent } from './dashboard-collections/notification-detail/notification-detail.component';
import { PackageDetailsComponent } from './dashboard/pages/package-details/package-details.component';
import { AddCategoryComponent } from './package/add-category/add-category.component';
import { ShowCategoryComponent } from './package/show-category/show-category.component';
import { AddSubcategoryComponent } from './package/add-subcategory/add-subcategory.component';
import { ShowSubcategoryComponent } from './package/show-subcategory/show-subcategory.component';
import { AddPackageComponent } from './package/add-package/add-package.component';
import { EditPackageComponent } from './package/edit-package/edit-package.component';
import { UserPackageComponent } from './dashboard/pages/user-package/user-package.component';
import { MetaTagsComponent } from './dashboard/pages/meta-tags/meta-tags.component';
import { AddMetatagComponent } from './metatags/add-metatag/add-metatag.component';
import { EditMetatagComponent } from './metatags/edit-metatag/edit-metatag.component';

const routes: Routes = [
 
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  { path: 'dashboard/package-details',component:PackageDetailsComponent },
  { path: 'dashboard/user-package-details',component:UserPackageComponent },
  { path: 'dashboard/user-package-details/delete/:id',component:UserPackageComponent },
  { path: 'dashboard/package-details/delete/:id',component:PackageDetailsComponent },
  {
    path:"package/add-category",
    component:AddCategoryComponent
  },
  { path: 'package/edit-package/:id',component:EditPackageComponent },
  {
    path:"package/category/:id",
    component:AddCategoryComponent
  },
  {
    path:"package/subcategory/:id",
    component:AddSubcategoryComponent
  },
  {
    path:"package/delete/:id",
    component:ShowCategoryComponent
  },
  {
    path:"package/deleteSubcategory/:id",
    component:ShowSubcategoryComponent
  },
  {
    path:"package/show-category",
    component:ShowCategoryComponent
  },
  {
    path:"package/add-Subcategory",
    component:AddSubcategoryComponent
  },
  {
    path:"package/show-Subcategory",
    component:ShowSubcategoryComponent
  },
  {
    path:"package/add-package",
    component:AddPackageComponent
  },
  {
    path:"dashboard/metaTags",
    component:MetaTagsComponent
  },
  {
    path:"metatags/edit-metatags/:id",
    component:EditMetatagComponent
  },
  {
    path:"metatags/add-metatag",
    component:AddMetatagComponent
  },
  {
    path:"metatags/delete/:id",
    component:MetaTagsComponent
  },
  // {
  //  path:"campaign-revenue-list",
  //  component: CampaignRevenueListComponent
  // },
  // un implemented route modules below !!
  
  {
    path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
  },
  {
    path: 'pages', loadChildren: () => import('./extraspages/extraspages.module').then(m => m.ExtraspagesModule)
  },
  {
    path: 'ui', loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
  },
  {
    path: 'extended', loadChildren: () => import('./extended/extended.module').then(m => m.ExtendedModule)
  },
  {
    path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule)
  },
  {
    path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'chart', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule)
  },
  {
    path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule)
  },
  {
    path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
  },
  { path: 'dashboard/notification-detail',component: NotificationDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
