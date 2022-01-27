<template>
	<div>
		<div>
			<p class="dashboard">My Dashboard</p>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-md-3">
					<div class="card-counter primary">
						<i class="fa fa-code-fork"></i>
						<span class="count-numbers">{{studentscount}}</span>
						<span class="count-name"><strong>students</strong></span>
					</div>
				</div>

				<div class="col-md-3">
					<div class="card-counter danger">
						<i class="fa fa-ticket"></i>
						<span class="count-numbers">{{absentcounts}}</span>
						<span class="count-name"><strong>absent_students</strong></span>
					</div>
				</div>

				<div class="col-md-3">
					<div class="card-counter success">
						<i class="fa fa-database"></i>
						<span class="count-numbers">{{presencestudents}}</span>
						<span class="count-name"><strong>present_students</strong></span>
					</div>
				</div>

				<div class="col-md-3">
					<div class="card-counter info">
						<i class="fa fa-users"></i>
						<span class="count-numbers">35</span>
						<span class="count-name">Users</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";

// import axios from "axios";
// import VueSweetalert2 from "vue-sweetalert2";

import { setHeaderAuth } from "/src/axios.js";

export default {
	name: "dashborad",
  data: function () {
		return {
			studentscount:null,
      absentcounts:null,
      presencestudents:null,
		};

    
	},
  created() {
    setHeaderAuth();
    axios.get("getstudentsnumbers").then((res)=>
    {
      this.studentscount=res.data
    })
      axios.get("getabsentstudents").then((res)=>
    {
      this.absentcounts=res.data
    })
      axios.get("getpresencestudents").then((res)=>
    {
      this.presencestudents=res.data
    })
  },
};
// @ is an alias to /src
</script>
<style>
.card-counter {
	box-shadow: 2px 2px 10px #dadada;
	margin: 5px;
	padding: 20px 10px;
	background-color: #fff;
	height: 100px;
	border-radius: 5px;
	transition: 0.3s linear all;
}

.card-counter:hover {
	box-shadow: 4px 4px 20px #dadada;
	transition: 0.3s linear all;
}

.card-counter.primary {
	background-color: #007bff;
	color: #fff;
}

.card-counter.danger {
	background-color: #ef5350;
	color: #fff;
}

.card-counter.success {
	background-color: #66bb6a;
	color: #fff;
}

.card-counter.info {
	background-color: #26c6da;
	color: #fff;
}

.card-counter i {
	font-size: 5em;
	opacity: 0.2;
}

.card-counter .count-numbers {
	position: absolute;
	right: 35px;
	top: 20px;
	font-size: 32px;
	display: block;
}

.card-counter .count-name {
	position: absolute;
	right: 35px;
	top: 65px;
	font-style: italic;
	text-transform: capitalize;
	opacity: 0.5;
	display: block;
	font-size: 18px;
}
.dashboard {
	font-size: large;
}
</style>