<template>
	<div>
		<b-button
			@click="addnewclass"
			style="float: right"
			size="lg"
			variant="success"
			>add new class</b-button
		>
		<b-modal
			no-close-on-backdrop="false"
			hide-header-close="false"
			no-close-on-esc="false"
			hide-footer="false"
			size="lg"
			id="savecourse"
		>
			<b-form-group
				id="course_name"
				label="course_name:"
				label-for="course_name"
			>
				<b-form-input
					id="course_name"
					type="text"
					placeholder="Enter course_name"
					v-model="newcourse.name"
					required
				></b-form-input>
			</b-form-group>

			<br />
			<br />

			<b-button
				@click="addnewcourse"
				style="float: right"
				size="lg"
				variant="success"
				>save student</b-button
			>

			<b-button
				@click="canceladdings"
				style="float: left"
				size="lg"
				variant="success"
				>cancel</b-button
			>
		</b-modal>
		<b-modal
			hide-footer="false"
			hide-header-close="false"
			no-close-on-backdrop="fasle"
			no-close-on-esc="false"
			size="lg"
			id="updateclass"
		>
			<div class="attent">
				<span class="student_allert"
					>be attention you are updating class info
				</span>
			</div>

			<b-form-group
				id="course_name"
				label="course_name:"
				label-for="course_name"
			>
				<b-form-input
					id="course_name"
					type="text"
					placeholder="Enter course_name"
					v-model="newcourse.name"
					required
				></b-form-input>
			</b-form-group>

			<br />
			<br />
			<b-button
				@click="updatecourse(newcourse.id)"
				style="float: right"
				size="lg"
				variant="success"
				>update course</b-button
			>
			<b-button
				@click="cancelupdateing"
				style="float: left"
				size="lg"
				variant="success"
				>cancel</b-button
			>
		</b-modal>

		<b-table striped hover :items="items" :fields="fields">
			<template #cell(actions)="row">
				<b-button
					size="lg"
					@click="updateclass(row.item, row.index, $event.target)"
					class="btn btn-success"
					v-b-modal.updatestudent
				>
					update
				</b-button>
				<b-button
					size="lg"
					@click="deleteclass(row.item, row.index, $event.target)"
					class="btn btn-danger"
				>
					delete
				</b-button>
			</template>
		</b-table>
	</div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

// import axios from "axios";
// import VueSweetalert2 from "vue-sweetalert2";
import Swal from "sweetalert2";

import { setHeaderAuth } from "/src/axios.js";

export default {
	name: "student",
	data: function () {
		return {
			newcourse: {
				id: "",
				name: "",
			},
			items: [],
			class_selected: null,
			student_classes: [],
			fields: [
				{ key: "id", label: "id" },
				{
					key: "name",
					label: "class_name",
					sortable: true,
					sortDirection: "desc",
				},

				{
					key: "actions",
					label: "actions",
				},
			],
		};
	},

	created: function () {
		setHeaderAuth();
		axios.get("courses").then((res) => {
			this.items = res.data;
		});
	},
	methods: {
		deleteclass(row) {
			setHeaderAuth();
			axios.delete("courses/" + row.id).then((res) => {
				console.log(res);

				this.items = this.items.filter((e) => e.id !== row.id);
				Swal.fire(
					"Good job!",
					"course has been deleted sucessfully",
					"success"
				);
			});
		},
		addnewclass() {
			this.$bvModal.show("savecourse");
		},
		addnewcourse() {
			setHeaderAuth();
			axios.post("courses", this.newcourse).then((res) => {
				console.log(res.data);
				this.items.push(res.data);
				Swal.fire("Good job!", "student has been added sucessfully", "success");
				this.$bvModal.hide("savecourse");
				this.newcourse.id = "";
				this.newcourse.name = "";
			});
		},
		canceladdings() {
			this.$bvModal.hide("savecourse");
			this.newcourse.id = "";
			this.newcourse.name = "";
		},
		updateclass(row) {
			this.$bvModal.show("updateclass");
			let updatesclass = this.items.filter((e) => e.id == row.id);
			this.newcourse.name = updatesclass[0].name;
			this.newcourse.id = updatesclass[0].id;
		},
		cancelupdateing() {
			this.$bvModal.hide("updateclass");
			this.newcourse.id = "";
			this.newcourse.name = "";
		},
		updatecourse(id) {
			axios.put("courses/" + id, this.newcourse).then((res) => {
				console.log(res);

				this.items.forEach((item, index) => {
					if (item.id === id) {
						this.items[index] = res.data;
						item.name = res.data.name;
						item.course_id = res.data.course_id;
						this.$bvModal.hide("updateclass");
						Swal.fire(
							"Good job!",
							"class has been updated sucessfully",
							"success"
						);
						this.newcourse.id = "";
						this.newcourse.name = "";
					}
				});
			});
		},
	},
};
</script>
<style   >
.student_allert {
	color: #fff;
	display: inline-block;
	/* float:left;  remove */
	margin: 10px 10px 5px 0;
	padding: 5px 10px;
	font-size: 20px;
}
.attent {
	background: red;
	overflow: hidden;
	text-align: center;
}
</style>
