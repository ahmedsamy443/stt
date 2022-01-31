import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import login from "../views/loginpage/login.vue";
import header from "../views/layout/header.vue";
import sidebar from "../views/layout/sidebar.vue";
import student from "../views/student/student.vue";
import teacher from "../views/teacher/teacher.vue";
import course from "../views/classes/course.vue";
import attendence from "../views/attendeance/attendence.vue";
import payement from "../views/payement/payemnt.vue";
import dashborad from "../views/dashborad/dashborad.vue";
import studentpayement from "../views/payement/studentpayement.vue";
import payement_reports from "../views/payement/payement_reports.vue";
import attendence_report from "../views/attendeance/attendence_report.vue"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/attendence_report",
    name: "attendence_report",
    component: attendence_report,
  },
  {
    path: "/studentpayement",
    name: "studentpayement",
    component: studentpayement,
  },
  {
    path: "/payement_reports",
    name: "payement_reports",
    component: payement_reports,
  },
  {
    path: "/attendence",
    name: "attendence",
    component: attendence,
  },
  {
    path: "/dashborad",
    name: "dashborad",
    component: dashborad,
  },
  {
    path: "/payement",
    name: "payement",
    component: payement,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/course",
    name: "course",
    component: course,
  },
  {
    path: "/student",
    name: "student",
    component: student,
  },
  {
    path: "/teacher",
    name: "teacher",
    component: teacher,
  },
  {
    path: "/header",
    name: "header",
    component: header,
  },
  {
    path: "/sidebar",
    name: "sidebar",
    component: sidebar,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
