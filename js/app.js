// const tasks = [
// 	// TEST tasks
// 	{
// 		_id: "5d2ca9e2e03d40b326596aa7",
// 		completed: true,
// 		body: "Im a test task, I am here cos one it`s better than two",
// 		title: "Im a test title and Im so lonely..",
// 	},
// 	{
// 		_id: "5d2ca9e29c8a94095c1288e0",
// 		completed: false,
// 		body: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
// 		title: "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
// 	},
// 	{
// 		_id: "5d2ca9e2e03d40b3232496aa7",
// 		completed: true,
// 		body: "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
// 		title: "Eu ea incididunt sunt consectetur fugiat non.",
// 	},
// 	{
// 		_id: "5d2ca9e29c8a94095564788e0",
// 		completed: false,
// 		body: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
// 		title: "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
// 	},
// ];

(function () {

	const objOfTasks = {};

	// theme styles
	const themes = {
		default: {
			"--body-bg": "#02fbff",
			"--header-bg": "#007bff",
			"--header-text-color": "#fff",
			"--default-btn-bg": "#007bff",
			"--default-btn-text-color": "#fff",
			"--default-btn-hover-bg": "#0069d9",
			"--default-btn-border-color": "#0069d9",
			"--danger-btn-bg": "#dc3545",
			"--danger-btn-text-color": "#fff",
			"--danger-btn-hover-bg": "#bd2130",
			"--danger-btn-border-color": "#dc3545",
			"--input-border-color": "#ced4da",
			"--input-bg-color": "#fff",
			"--input-text-color": "#495057",
			"--input-focus-bg-color": "#fff",
			"--input-focus-text-color": "#495057",
			"--input-focus-border-color": "#80bdff",
			"--input-focus-box-shadow": "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
		},
		dark: {
			"--body-bg": "#023382",
			"--header-bg": "#343a40",
			"--header-text-color": "#fff",
			"--default-btn-bg": "#58616b",
			"--default-btn-text-color": "#fff",
			"--default-btn-hover-bg": "#292d31",
			"--default-btn-border-color": "#343a40",
			"--default-btn-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
			"--danger-btn-bg": "#b52d3a",
			"--danger-btn-text-color": "#fff",
			"--danger-btn-hover-bg": "#88222c",
			"--danger-btn-border-color": "#88222c",
			"--input-border-color": "#ced4da",
			"--input-bg-color": "#fff",
			"--input-text-color": "#495057",
			"--input-focus-bg-color": "#fff",
			"--input-focus-text-color": "#495057",
			"--input-focus-border-color": "#78818a",
			"--input-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
		},
		light: {
			"--body-bg": "#ffffff",
			"--header-bg": "#fff",
			"--header-text-color": "#212529",
			"--default-btn-bg": "#fff",
			"--default-btn-text-color": "#212529",
			"--default-btn-hover-bg": "#e8e7e7",
			"--default-btn-border-color": "#343a40",
			"--default-btn-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
			"--danger-btn-bg": "#f1b5bb",
			"--danger-btn-text-color": "#212529",
			"--danger-btn-hover-bg": "#ef808a",
			"--danger-btn-border-color": "#e2818a",
			"--input-border-color": "#ced4da",
			"--input-bg-color": "#fff",
			"--input-text-color": "#495057",
			"--input-focus-bg-color": "#fff",
			"--input-focus-text-color": "#495057",
			"--input-focus-border-color": "#78818a",
			"--input-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
		},
	};


	// Elements UI
		// main container
	const listContainer = document.querySelector(".tasks-list-section .list-group");
		// form
	const form = document.forms["addTask"],
		inputTitle = form.elements["title"],
		inputBody = form.elements["body"];
		// buttons for sorting
	const buttons = document.querySelectorAll(".tasks-list-section .btn-info");
	let lastSelectedTheme = localStorage.getItem("appTheme") || "dark";
	const themeSelect = document.getElementById("themeSelect");
	
	// default functions
	setTheme(lastSelectedTheme);
	changeValue(lastSelectedTheme);
	tata.warn("Do not clear local storage","The app is using local storage to save your tasks", {
		holding: false,
		closeBtn: true,
		progress: true,
		animate: "fade",
		duration: 7000,
		position: "tm"
	});

	// Inserting saved tasks from local storage
	listContainer.insertAdjacentHTML("beforeend", localStorage.getItem("tasks") || "");
	// then puts them into the objOfTasks using createNewTask function
	listContainer.querySelectorAll("li").forEach(el => {
		const content = [el.querySelector("span").textContent, el.querySelector("p").textContent, el.dataset.id, el.classList.contains("complete")];

		createNewTask(content[0], content[1], content[2], content[3]);
	});

	// Event listeners
	buttons.forEach(el => el.firstElementChild.addEventListener("click", sortCompleted));
	themeSelect.addEventListener("change", onThemeSelect)
	form.addEventListener("submit", onFormSubmit);
	listContainer.addEventListener("click", onContainerClick);

	// main functions
	function onContainerClick({
		target
	}) {
		if (target.classList.contains("delete-btn")) {
			onDeleteHandler(target);
		} else if (target.classList.contains("complete-btn")) {
			onCompleteHandler(target);
		}
	}

	// function renderAllTasks(tasksList) {
	// 	if (!tasksList) {
	// 		console.error(`No arguments in ${this}`);
	// 		return;
	// 	}

	// 	const fragment = document.createDocumentFragment();
	// 	Object.values(tasksList).forEach(task => {
	// 		const li = listItemTemplate(task);
	// 		fragment.appendChild(li);
	// 	});

	// 	listContainer.appendChild(fragment);
	// }

	function listItemTemplate({
		_id,
		title,
		body
	} = {}) {
		const li = document.createElement("li");
		li.classList.add("list-group-item", "d-flex", "align-items-center", "flex-wrap", "mt-4");
		li.style.minHeight = "200px";
		li.dataset.id = _id;

		if (buttons[1].classList.contains("active")) {
			li.classList.add("hidden");
		}

		const span = document.createElement("span");
		span.textContent = title;
		span.style.fontWeight = "bold";

		const deleteBtn = document.createElement("button");
		deleteBtn.textContent = "Delete";
		deleteBtn.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");

		const completeBtn = document.createElement("button");
		completeBtn.textContent = "Completed";
		completeBtn.classList.add("btn", "btn-success", "ml-auto", "complete-btn")

		const article = document.createElement("p");
		article.textContent = body;
		article.classList.add("mt-3", "w-100");

		li.appendChild(span);
		li.appendChild(deleteBtn);
		li.appendChild(article);
		li.appendChild(completeBtn);

		return li;
	}

	function onFormSubmit(e) {
		e.preventDefault();
		const titleValue = inputTitle.value,
			bodyValue = inputBody.value;

		if (!titleValue || !bodyValue) {
			tata.error("Form-error","Input correct values", {
				holding: false,
				closeBtn: true,
				progress: true,
				animate: "slide",
			});
			return;
		}

		const task = createNewTask(titleValue, bodyValue);
		const listItem = listItemTemplate(task);
		if (!listItem.classList.contains("hidden")) deleteMessage();
		listContainer.insertAdjacentElement("afterbegin", listItem);

		tata.info("Task added","Good luck!", {
			holding: false,
			closeBtn: true,
			progress: true,
			animate: "slide",
		});

		localStorageSave()
		form.reset();
	}

	function createNewTask(title, body, id=null, completed=false) {
		id = id==null ? null: id.replace("task - ", "");
		const newTask = {
			title,
			body,
			completed: completed,
			_id: `task - ${id || Math.random()}`,
		};

		objOfTasks[newTask._id] = newTask;
		return {
			...newTask
		};
	}



	// message - block that appeared when there are no tasks
	function createMessage(text) {
		const fragment = document.createDocumentFragment();

		const li = document.createElement("li");
		li.classList.add("list-group-item", "d-flex", "align-items-center", "flex-wrap", "mt-4", "justify-content-center");
		li.style.minHeight = "100px";
		li.setAttribute("data-msg", "empty");

		const span = document.createElement("span");
		span.textContent = text;
		span.style.fontWeight = "bold";

		li.appendChild(span);
		fragment.appendChild(li);
		return fragment;
	}

	function deleteMessage() {
		const msg = listContainer.querySelector("[data-msg]") || false;
		if (msg) {
			msg.remove()
		}
	}

	function inputMessage(text) {
		const fragment = createMessage(text);
		listContainer.appendChild(fragment);
	}

	// delete/complete handlers
	function onDeleteHandler(target) {
		const parent = target.closest("[data-id]");
		const id = parent.dataset.id;
		const confirmed = deleteTask(id);
		deleteTaskHTML(parent, confirmed);
	}

	function deleteTask(id) {
		const { title } = objOfTasks[id]
		const isConfirm = confirm(`You are going to delete "${title}", are you sure?`);
		if (!isConfirm) return false;
		delete objOfTasks[id];

		return isConfirm;
	}

	function deleteTaskHTML(el, confirmed) {
		if (!confirmed) return;
		tata.log("Task deleted","Add a new one right now", {
			holding: false,
			closeBtn: true,
			progress: true,
			animate: "slide",
		});
		el.remove();
		localStorageSave();
	}

	function onCompleteHandler(target) {
		const parent = target.closest("[data-id]");
		const id = parent.dataset.id;
		completeTask(parent, id);
	}

	function completeTask(parent, id) {
		if (parent.classList.toggle("complete")) {
			objOfTasks[id].completed = true;
			tata.success("Task completed!","Congratulations!", {
				holding: false,
				closeBtn: true,
				progress: true,
				animate: "slide",
			});
			localStorageSave();
		} else {
			objOfTasks[id].completed = false;
		}
	}

	// sorting
	function sortCompleted() {
		let [...listItemsHTML] = document.querySelectorAll("ul .list-group-item");
		listItemsHTML = listItemsHTML.filter(el => el.getAttribute("data-id"));
		let [completed, unCompleted] = sortTasks(listItemsHTML);

		if (this.id === "completed") {
			toggleActive(buttons, this);
			deleteMessage();

			showCompleted(completed, unCompleted);

		} else if (this.id === "unCompleted") {
			toggleActive(buttons, this);
			deleteMessage();

			showUnCompleted(completed, unCompleted);
		} else {
			toggleActive(buttons, this);
			deleteMessage();

			showAll(completed, unCompleted);
		}
	}

	function sortTasks(arrHTML) {
		const completed = [];
		const unCompleted = [];

		arrHTML.forEach(el => {
			id = el.dataset.id || false;
			if (id && objOfTasks[id].completed) {
				completed.push(el);
			} else {
				unCompleted.push(el);
			}
		});

		return [completed, unCompleted];
	}

	function toggleActive(arr, element) {
		arr.forEach(el => el.closest(".btn").classList.remove("active"))
		element.closest(".btn").classList.add("active");
	}

	function showAll(completed, unCompleted) {
		if (!Object.keys(objOfTasks).length) {
			inputMessage("There are no tasks. You can simply add them!");
			return;
		}
		completed.forEach(el => el.classList.remove("hidden"));
		unCompleted.forEach(el => el.classList.remove("hidden"));
	}

	function showCompleted(completed, unCompleted) {
		if (!completed.length) {
			inputMessage("There are no completed tasks yet. Begin right now!");
		}
		unCompleted.forEach(el => el.classList.add("hidden"));
		completed.forEach(el => el.classList.remove("hidden"));
	}

	function showUnCompleted(completed, unCompleted) {
		if (!unCompleted.length) {
			inputMessage("There are no tasks. You can simply add them!");
		}
		unCompleted.forEach(el => el.classList.remove("hidden"));
		completed.forEach(el => el.classList.add("hidden"));
	}

	// theme
	function onThemeSelect(e) {
		const selectedTheme = themeSelect.value;
		setTheme(selectedTheme);
		localStorage.setItem("appTheme", selectedTheme);
	}

	function setTheme(name) {
		const selecdetThemeObj = themes[name];

		Object.entries(selecdetThemeObj).forEach(([key, value]) => {
			document.documentElement.style.setProperty(key, value);
		});
	}

	function changeValue(name) {
		const opts = themeSelect.options;
		for (var opt, j = 0; opt = opts[j]; j++) {
			if (opt.value == name) {
			  themeSelect.selectedIndex = j;
			  break;
			}
		}
	}

	// saving in local storage
	function localStorageSave() {
		localStorage.setItem("tasks", listContainer.innerHTML);
	}

})();