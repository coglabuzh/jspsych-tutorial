import instructions from "@jspsych/plugin-instructions"


const instr1 = `<div class="main">
<img src="assets/Images/MemoryPhase.gif" class="image"></img>
</div>`;

const instr2 = `<div class="main">
<img src="assets/Images/RetrievalPhase.gif" class="image"></img>
</div>`;


  
export const slide_line = {
    type: instructions,
    pages: [instr1, instr2],
    show_clickable_nav: true,
    data: { screenID: "instruction" },
};

