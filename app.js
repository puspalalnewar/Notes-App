const btn = document.querySelector("#btn");
const main = document.querySelector("#main");

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach(
        function (e) {
            data.push(e.value);
        }
    )
    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
}

btn.addEventListener("click",
    function () {
        addNote();
    }
)


const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
            <div class="tool">
                <i class="trash fa-solid fa-trash"></i>
                <i class="save fa-solid fa-floppy-disk"></i>
            </div>
            <textarea>${text}</textarea>
            `

    note.querySelector(".trash").addEventListener("click", (e) => {
        note.remove();
        saveNotes();
    })
    note.querySelector(".save").addEventListener("click", () => {
        saveNotes();
    })
    main.appendChild(note);
    saveNotes();
    note.querySelector("textarea").addEventListener("focusout",
        function () {
            saveNotes();
    })
}

(
    function () {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null) {
            addNote();
        } else {
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote);
                }
            )
        }

    }
)()


