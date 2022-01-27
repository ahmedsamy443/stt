<template>
	<div>
		<div
			class="sidebar"
			data-background-color="black"
			data-active-color="danger"
		>
			<div class="sidebar-wrapper" id="sideLinks">
				<div class="logo">
					<a href="index.php" class="simple-text"> School Management </a>
				</div>
				<ul class="nav">
					<li class="" id="dashboard">
						<a href="index.php" class="menu-link">
							<i class="ti-dashboard"></i>
							<p>Dashboard</p>
						</a>
					</li>
					<li id="students">
						<a href="students.php" class="menu-link">
							<i class="ti-user"></i>
							<p>Student</p>
						</a>
					</li>
					<li id="classes">
						<a href="classes.php" class="menu-link">
							<i class="ti-crown"></i>
							<p>Classes</p>
						</a>
					</li>
					<li id="sections">
						<a href="sections.php" class="menu-link">
							<i class="ti-crown"></i>
							<p>Sections</p>
						</a>
					</li>
					<li id="teacher">
						<a href="teacher.php" class="menu-link">
							<i class="ti-home"></i>
							<p>Teacher</p>
						</a>
					</li>
					<li id="subjects">
						<a href="subjects.php" class="menu-link">
							<i class="ti-home"></i>
							<p>Subjects</p>
						</a>
					</li>
					<li id="attendance">
						<a href="attendance.php" class="menu-link">
							<i class="ti-bar-chart-alt"></i>
							<p>Attendance</p>
						</a>
					</li>
					<li id="attendance_report">
						<a href="attendance_report.php" class="menu-link">
							<i class="ti-bar-chart-alt"></i>
							<p>Attendance Report</p>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: "header",
	data: function () {
		return {};
	},

	methods: {},
};
</script>
<style>
</style>
