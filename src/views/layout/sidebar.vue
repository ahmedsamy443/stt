<template lang="html">
<div>
	<nav class="navbar navbar-default no-margin">
     
      <div class="navbar-header fixed-brand">
         <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" id="menu-toggle">
<span class="glyphicon glyphicon-th-large" aria-hidden="true"></span>
</button>
      </div>
      <!-- navbar-header-->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
         <ul class="nav navbar-nav">
            <li class="active">
               <button class="navbar-toggle collapse in" data-toggle="collapse" id="menu-toggle-2"> asas<span class="glyphicon glyphicon-th-large" aria-hidden="true"></span>
               </button>
            </li>
         </ul>
      </div>
      <!-- bs-example-navbar-collapse-1 -->
   </nav>
   
   <div id="wrapper">
      <!-- Sidebar -->
      <div id="sidebar-wrapper">
         <img src="/src/assets/logo.png" alt="">
         <ul class="sidebar-nav nav-pills nav-stacked" id="menu">
          
         <li>
               <a href="#"><span class="fa-stack fa-lg pull-left"><i class="fa fa-cloud-download fa-stack-1x "></i></span><router-link to="/dashborad">Dashboard</router-link></a>
            </li>
            <li class="active">
               <a href="#"><span class="fa-stack fa-lg pull-left"><i class="fa fa-dashboard fa-stack-1x "></i></span> students</a>
               <ul class="nav-pills nav-stacked" style="list-style-type:none;">
                  <li><router-link to="/student">student</router-link></li>
                  <li><a href="#">students_reports</a></li>
               </ul>
            </li>
			 <li>
               <a href="#"> <span class="fa-stack fa-lg pull-left"><i class="fa fa-cart-plus fa-stack-1x "></i></span></a>
            </li>
            <li>
               <a href="#"><span class="fa-stack fa-lg pull-left"><i class="fa fa-flag fa-stack-1x "></i></span>Shortcut</a>
               <ul class="nav-pills nav-stacked" style="list-style-type:none;">
                  <li><a href="#"><span class="fa-stack fa-lg pull-left"><i class="fa fa-flag fa-stack-1x "></i></span>link1</a></li>
                  <li><a href="#"><span class="fa-stack fa-lg pull-left"><i class="fa fa-flag fa-stack-1x "></i></span>link2</a></li>
               </ul>
            </li>
            <li>
               <a href="#"><span class="fa-stack fa-lg pull-left"><i class="fa fa-cloud-download fa-stack-1x "></i></span><router-link to="/attendence">Attendance</router-link></a>
            </li>
            <li>
               <a href="#"> <span class="fa-stack fa-lg pull-left"><i class="fa fa-cart-plus fa-stack-1x "></i></span><router-link to="/dashborad">classes</router-link></a>
            </li>
            <li>
               <a href="#"><span class="fa-stack fa-lg pull-left"><i class="fa fa-youtube-play fa-stack-1x "></i></span>About</a>
            </li>
            <li>
               <a href="#"><span class="fa-stack fa-lg pull-left"><i class="fa fa-wrench fa-stack-1x "></i></span>Services</a>
            </li>
            <li>
               <a href="#"><span class="fa-stack fa-lg pull-left"><i class="fa fa-server fa-stack-1x "></i></span>Contact</a>
            </li>
         </ul>
      </div>
      <!-- /#sidebar-wrapper -->
      <!-- Page Content -->
      <div id="page-content-wrapper">
        <br>
        <br>
         <router-view />  
      </div>
      <!-- /#page-content-wrapper -->
   
   </div>
   <!-- /#wrapper -->
   <!-- jQuery -->

</div>


</template>

<script lang="js">

import jQuery from "jQuery";
const $=jQuery
$(function () {
  initMenu()
	$("#menu-toggle").click(function(e) {
   e.preventDefault();
   $("#wrapper").toggleClass("toggled");
});
$("#menu-toggle-2").click(function(e) {
   e.preventDefault();
   $("#wrapper").toggleClass("toggled-2");
   $('#menu ul').hide();
});

function initMenu() {
   $('#menu ul').hide();
   $('#menu ul').children('.current').parent().show();
   //$('#menu ul:first').show();
   $('#menu li a').click(
      function() {
         var checkElement = $(this).next();
         if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
            return false;
         }
         if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
            $('#menu ul:visible').slideUp('normal');
            checkElement.slideDown('normal');
            return false;
         }
      }
   );
}

});

export default {
  name: 'sidebar',
  data() {
      return {
           opened: false,
      }
  },
 created() {
  
 },
 
 methods: {
 
 },
}
</script>

<style >
.nav-pills > li > a {
	border-radius: 0;
}

#wrapper {
	padding-left: 0;
	-webkit-transition: all 0.5s ease;
	-moz-transition: all 0.5s ease;
	-o-transition: all 0.5s ease;
	transition: all 0.5s ease;
	overflow: hidden;
}

#wrapper.toggled {
	padding-left: 250px;
	overflow: hidden;
}

#sidebar-wrapper {
	z-index: 1000;
	position: absolute;
	left: 250px;
	width: 0;
	height: 100%;
	margin-left: -250px;
	overflow-y: auto;
	background: #000;
	-webkit-transition: all 0.5s ease;
	-moz-transition: all 0.5s ease;
	-o-transition: all 0.5s ease;
	transition: all 0.5s ease;
}

#wrapper.toggled #sidebar-wrapper {
	width: 250px;
}

#page-content-wrapper {
	position: absolute;
	padding: 15px;
	width: 100%;
	overflow-x: hidden;
}

.xyz {
	min-width: 360px;
}

#wrapper.toggled #page-content-wrapper {
	position: relative;
	margin-right: 0px;
}

.fixed-brand {
	width: auto;
}
/* Sidebar Styles */

.sidebar-nav {
	position: absolute;
	top: 0;
	width: 250px;
	margin: 0;
	padding: 0;
	list-style: none;
	margin-top: 2px;
}

.sidebar-nav li {
	text-indent: 15px;
	line-height: 40px;
}

.sidebar-nav li a {
	display: block;
	text-decoration: none;
	color: #999999;
}

.sidebar-nav li a:hover {
	text-decoration: none;
	color: #fff;
	background: rgba(255, 255, 255, 0.2);
	border-left: red 2px solid;
}

.sidebar-nav li a:active,
.sidebar-nav li a:focus {
	text-decoration: none;
}

.sidebar-nav > .sidebar-brand {
	height: 65px;
	font-size: 18px;
	line-height: 60px;
}

.sidebar-nav > .sidebar-brand a {
	color: #999999;
}

.sidebar-nav > .sidebar-brand a:hover {
	color: #fff;
	background: none;
}

.no-margin {
	margin: 0;
}

@media (min-width: 768px) {
	#wrapper {
		padding-left: 250px;
	}
	.fixed-brand {
		width: 250px;
	}
	#wrapper.toggled {
		padding-left: 0;
	}
	#sidebar-wrapper {
		width: 250px;
	}
	#wrapper.toggled #sidebar-wrapper {
		width: 250px;
	}
	#wrapper.toggled-2 #sidebar-wrapper {
		width: 50px;
	}
	#wrapper.toggled-2 #sidebar-wrapper:hover {
		width: 250px;
	}
	#page-content-wrapper {
		padding: 20px;
		position: relative;
		-webkit-transition: all 0.5s ease;
		-moz-transition: all 0.5s ease;
		-o-transition: all 0.5s ease;
		transition: all 0.5s ease;
	}
	#wrapper.toggled #page-content-wrapper {
		position: relative;
		margin-right: 0;
		padding-left: 250px;
	}
	#wrapper.toggled-2 #page-content-wrapper {
		position: relative;
		margin-right: 0;
		margin-left: -200px;
		-webkit-transition: all 0.5s ease;
		-moz-transition: all 0.5s ease;
		-o-transition: all 0.5s ease;
		transition: all 0.5s ease;
		width: auto;
	}
}
</style>
