import {zoom} from "@/modules/logic/zoom";
import paper from "paper";
const {jsPDF}=require("jspdf")
import {saveAs} from 'file-saver';
export function exportAs(ext, canvas, filename) {
    let imgData, docPDF, blob, svgStr, link, step
    canvas.hardReset()
    if (canvas.defaultWidth < canvas.resoX)
	step = canvas.resoX / canvas.defaultWidth
    else step = canvas.defaultWidth / canvas.resoX
    zoom(null, step, "=", canvas)
    paper.view.update()
    switch (ext) {
	case 'png':
	    canvas.ref.toBlob(function (blob) {
		saveAs(blob, `${filename}.png`);
	    });
	    break
	case 'jpg':
	    canvas.ref.toBlob(function (blob) {
		saveAs(blob, `${filename}.jpg`);
	    });
	    break
	case 'pdf':
	    imgData = canvas.ref.toDataURL('image/png')
	    docPDF = new jsPDF((canvas.XtoY > 1) ? 'l' : 'p', 'px', [canvas.resoX, canvas.resoY]);
	    docPDF.addImage(imgData, 'PNG', 0, 0, canvas.resoX, canvas.resoY);
	    docPDF.save(`${filename}.pdf`);
	    break
	case 'json':
	    blob = new Blob([paper.project.exportJSON()], {type: "application/json"});
	    saveAs(blob, `${filename}.json`);
	    break
	case 'svg':
	    svgStr = paper.project.exportSVG({asString: true});
	    link = document.createElement("a");
	    link.href = "data:image/svg+xml," + encodeURIComponent(svgStr);
	    link.download = `${filename}.svg`;
	    document.body.appendChild(link);
	    link.click();
	    document.body.removeChild(link);
    }
    canvas.hardReset()
}
