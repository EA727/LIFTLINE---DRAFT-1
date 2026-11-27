/* Tiny renderer for the LiftLine template: {{holes}}, <sc-if>, <sc-for>, on* events. */
(function(){
  var EVENTS={onclick:'click',onchange:'input',onpointerdown:'pointerdown',onpointerup:'pointerup'};
  var KEY='liftline-state-v1';
  function DCLogic(props){this.props=props||{};}
  DCLogic.prototype.setState=function(u){var st=this.state;Object.assign(st,typeof u==='function'?u(st):u);this._schedule&&this._schedule();};
  window.DCLogic=DCLogic;

  function lookup(path,scopes){var parts=path.trim().split('.');for(var i=scopes.length-1;i>=0;i--){if(scopes[i]&&parts[0] in scopes[i]){var v=scopes[i];for(var j=0;j<parts.length;j++){if(v==null)return undefined;v=v[parts[j]];}return v;}}return undefined;}
  var HOLE=/\{\{([^}]+)\}\}/g;
  function interp(str,scopes){return str.replace(HOLE,function(_,p){var v=lookup(p,scopes);return v==null?'':String(v);});}
  function single(str){var m=/^\s*\{\{([^}]+)\}\}\s*$/.exec(str);return m?m[1]:null;}

  var uid=0;
  function tagTemplate(node){if(node.nodeType===1){node.__k='k'+(uid++);}var c=node.firstChild;while(c){tagTemplate(c);c=c.nextSibling;}}

  function build(tnode,scopes,handlers,suffix,out){
    if(tnode.nodeType===3){out.push(document.createTextNode(interp(tnode.nodeValue,scopes)));return;}
    if(tnode.nodeType!==1)return;
    var name=tnode.localName;
    if(name==='sc-if'){var p=single(tnode.getAttribute('value')||'');if(p&&lookup(p,scopes)){kids(tnode,scopes,handlers,suffix+'.'+tnode.__k,out);}return;}
    if(name==='sc-for'){var lp=single(tnode.getAttribute('list')||''),as=tnode.getAttribute('as')||'item',list=lp?lookup(lp,scopes):null;
      (list||[]).forEach(function(item,i){var sc={};sc[as]=item;kids(tnode,scopes.concat([sc]),handlers,suffix+'.'+tnode.__k+'_'+i,out);});return;}
    var el=document.createElementNS(tnode.namespaceURI,tnode.localName);
    for(var a=0;a<tnode.attributes.length;a++){var at=tnode.attributes[a],an=at.name.toLowerCase();
      if(EVENTS[an]){var fp=single(at.value),fn=fp?lookup(fp,scopes):null;if(typeof fn==='function'){var id=handlers.length;handlers.push(fn);el.setAttribute('data-'+EVENTS[an],String(id));}continue;}
      el.setAttribute(at.name,interp(at.value,scopes));}
    if(name==='input'){el.value=el.getAttribute('value')||'';}
    el.setAttribute('data-k',tnode.__k+suffix);
    var sub=[];kids(tnode,scopes,handlers,'',sub);sub.forEach(function(n){el.appendChild(n);});
    out.push(el);
  }
  function kids(tnode,scopes,handlers,suffix,out){var c=tnode.firstChild;while(c){build(c,scopes,handlers,suffix,out);c=c.nextSibling;}}

  function mount(Component,props){
    var root=document.getElementById('app'),tpl=document.getElementById('tpl').content;
    tagTemplate(tpl);
    var comp=new Component(props);
    try{var saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&!/[?&]reset/.test(location.search)){Object.assign(comp.state,saved);if(comp.state.screen==='building')comp.state.screen='ready';comp.state.menuOpen=false;}}catch(e){}
    var handlers=[],pending=false;
    function render(){pending=false;handlers=[];var vals=comp.renderVals();var nodes=[];kids(tpl,[vals],handlers,'',nodes);
      var next=document.createElement('div');next.id='app';nodes.forEach(function(n){next.appendChild(n);});
      morphdom(root,next,{getNodeKey:function(n){return n.getAttribute?(n.getAttribute('data-k')||n.id):null;},
        onBeforeElUpdated:function(from,to){if(from.tagName==='INPUT'&&from===document.activeElement){to.value=from.value;}return true;}});
      try{localStorage.setItem(KEY,JSON.stringify(comp.state));}catch(e){}}
    comp._schedule=function(){if(!pending){pending=true;requestAnimationFrame(render);}};
    var px=0,py=0;root.addEventListener('pointerdown',function(e){px=e.clientX;py=e.clientY;},true);
    ['click','input','pointerdown','pointerup'].forEach(function(type){root.addEventListener(type,function(e){if(type==='click'&&e.detail&&Math.abs(e.clientX-px)+Math.abs(e.clientY-py)>12)return;var el=e.target.closest?e.target.closest('[data-'+type+']'):null;if(!el||!root.contains(el))return;var fn=handlers[+el.getAttribute('data-'+type)];if(fn)fn(e);});});
    render();
  }
  window.LiftLineRuntime={mount:mount};
})();
