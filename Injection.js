console.log("opgg 阻止防廣告視窗提醒跳出啟用中");

// // 阻止所有事件的函数
// function stopEventPropagation(event) {
//     event.stopImmediatePropagation();
//     event.preventDefault();
//     return false;
// }
// 
// // 为目标元素添加事件监听器
// function disableElementEvents(element) {
//     const events = ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove', 'keydown', 'keyup', 'keypress'];
//     events.forEach(event => {
//         element.addEventListener(event, stopEventPropagation, true);
//     });
// }
// 
// 
// // 监测目标元素并禁用其事件
// function applyRestrictions(targetNode) {
//     console.log('Target element found:', targetNode);
// 
//     disableElementEvents(targetNode);
// 
//     const originalStyles = targetNode.getAttribute('style') || '';
// 
//     const observer = new MutationObserver((mutationsList) => {
//         for (let mutation of mutationsList) {
//             if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
//                 console.log('Style attribute changed, restoring original styles');
//                 targetNode.setAttribute('style', originalStyles);
//             }
//         }
//     });
// 
//     observer.observe(targetNode, {
//         attributes: true
//     });
// }
// 
// // 初始检查，确保在页面加载时已经存在的目标元素也被限制
// document.querySelectorAll('.fc-ab-root').forEach(applyRestrictions);

// 删除目标元素的函数
function removeElement(element) {
    if (element) {
        console.log("已移除防廣告視窗提醒");
        element.remove();
        document.querySelector("body").style.overflow = "auto";
    }
}

// 监控整个文档的变化
const documentObserver = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.matches(".fc-ab-root")) {
                    removeElement(node);
                }
            });
        }
    }
});

// 开始监控整个文档的子树变化
documentObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
});