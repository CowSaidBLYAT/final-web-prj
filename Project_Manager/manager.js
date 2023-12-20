const container = document.getElementById('task-container');

let draggedItem = null;
let sourceList = null;

container.addEventListener('dragstart', function (e) {
    draggedItem = e.target;
    sourceList = getClosest(e.target, '.list');
    setTimeout(() => {
        e.target.style.display = 'none';
    }, 0);
});

container.addEventListener('dragend', function () {
    setTimeout(() => {
        draggedItem.style.display = 'block';
        draggedItem = null;
        sourceList = null;
    }, 0);
});

container.addEventListener('dragover', function (e) {
    e.preventDefault();
    const targetList = getClosest(e.target, '.list');

    if (targetList && sourceList === targetList) {
        const afterElement = getDragAfterElement(e.target, e.clientY);
        if (afterElement == null) {
            targetList.appendChild(draggedItem);
        } else {
            targetList.insertBefore(draggedItem, afterElement);
        }
    }
});

container.addEventListener('dragenter', function (e) {
    const targetList = getClosest(e.target, '.list');
    if (targetList && sourceList === targetList) {
        targetList.classList.add('drag-over');
    }
});

container.addEventListener('dragleave', function (e) {
    const targetList = getClosest(e.target, '.list');
    if (targetList && sourceList === targetList) {
        targetList.classList.remove('drag-over');
    }
});

function getClosest(el, selector) {
    while (el && !el.matches(selector)) {
        el = el.parentNode;
    }
    return el;
}

function getDragAfterElement(target, y) {
    const draggableElements = [...target.querySelectorAll('.card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-group')) {
        const list = getClosest(e.target, '.list');
        list.parentElement.removeChild(list);
    }
});

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-group')) {
        var list = document.createElement('div');
        list.className = 'list';
        list.draggable = true;

        var groupTitle = document.createElement('div');
        groupTitle.className = 'group-title';
        groupTitle.textContent = 'Group ' + (container.querySelectorAll('.list').length + 1);

        var addCard = document.createElement('button');
        addCard.className = 'add-card';
        addCard.textContent = 'Add Card';

        var removeGroup = document.createElement('button');
        removeGroup.className = 'remove-group';
        removeGroup.textContent = 'Remove Group';

        list.appendChild(groupTitle);
        list.appendChild(addCard);
        list.appendChild(removeGroup);
        container.appendChild(list);
    }
});

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-card')) {
        var list = e.target.parentElement;
        var card = document.createElement('div');
        card.className = 'card';

        var cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        cardTitle.textContent = 'Card ' + (list.querySelectorAll('.card').length + 1);

        var deleteCard = document.createElement('button');
        deleteCard.className = 'delete-card';
        deleteCard.textContent = 'Delete Card';

        var completedCard = document.createElement('button');
        completedCard.className = 'completed-card';
        completedCard.textContent = 'Completed';

        var buttons = document.createElement('div');
        buttons.className = 'buttons';
        buttons.appendChild(deleteCard);
        buttons.appendChild(completedCard);

        card.appendChild(cardTitle);
        card.appendChild(buttons);
        list.insertBefore(card, e.target);
    }
});

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-card')) {
        var card = e.target.parentElement.parentElement;
        card.parentElement.removeChild(card);
    }
});

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('completed-card')) {
        var card = e.target.parentElement.parentElement;
        card.classList.toggle('completed');
    }
});

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('card-title')) {
        var cardTitle = e.target;
        cardTitle.contentEditable = true;
        cardTitle.classList.add('edit-mode');
    }
});

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('group-title')) {
        var groupTitle = e.target;
        groupTitle.contentEditable = true;
        groupTitle.classList.add('edit-mode');
    }
});

container.addEventListener('blur', function (e) {
    if (e.target.classList.contains('card-title') || e.target.classList.contains('group-title')) {
        e.target.contentEditable = false;
        e.target.classList.remove('edit-mode');
    }
});
