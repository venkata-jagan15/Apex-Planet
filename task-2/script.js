document.addEventListener('DOMContentLoaded', function() {

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    let valid = true;
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Name is required.';
      valid = false;
    } else {
      nameError.textContent = '';
    }
    if (!emailInput.value.trim()) {
      emailError.textContent = 'Email is required.';
      valid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Enter a valid email.';
      valid = false;
    } else {
      emailError.textContent = '';
    }
    if (!messageInput.value.trim()) {
      messageError.textContent = 'Message is required.';
      valid = false;
    } else {
      messageError.textContent = '';
    }
    if (!valid) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    contactForm.reset();
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    alert('Message sent!');
  });
}

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.textContent = taskText;
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'remove-btn';
  removeBtn.onclick = function() {
    taskList.removeChild(li);
  };
  li.appendChild(removeBtn);
  return li;
}

if (addTaskBtn && taskInput && taskList) {
  addTaskBtn.addEventListener('click', function() {
    const task = taskInput.value.trim();
    if (task) {
      const li = createTaskElement(task);
      taskList.appendChild(li);
      taskInput.value = '';
      taskInput.focus();
    }
  });

  taskInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      addTaskBtn.click();
    }
  });
}
}); 