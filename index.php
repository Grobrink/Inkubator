<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<title>Inkubator : Another NPC generator for D&D (aka 5 or Next)</title>
		<meta name="author" content="Pierre Lefèvre">

		<link rel="stylesheet" type="text/css" href="./css/styles.css">
		<link rel="icon" href="favicon.png" sizes="128x128" type="image/png">

		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-52714903-1', 'auto');
			ga('send', 'pageview');
		</script>
	</head>

	<body>

		<div id="inkubator">

			<span id="login-span" class="active">Login <span class="glyphicon glyphicon-log-in"></span></span>
			<span id="logout"><span id="username"></span>, Logout <span class="glyphicon glyphicon-log-out"></span></span>

			<div id="settings-panel">
				<div id="levels">
					<span><label>Population </label><input id="population" type="number" min="0" step="1" value="140000" /></span>
					 or
					<span><label>Level </label><input id="level" type="number" min="1" max="20" step="1" /></span>
				</div>
			</div>

			<span id="settings-cta">
				<span>
					<span id="settings-icon" class="glyphicon glyphicon-cog"></span>
					<span id="settings-label">Settings</span>
				</span>
			</span>

			<button id="new-npc" type="button" class="btn btn-default">Generate !</button>

			<div class="btn-group" id="saveAndLoad">
				<button id="load-npclist" type="button" class="btn btn-default">Load</button>
				<button id="save-npclist" type="button" class="btn btn-default">Save</button>
			</div>

			<div id="container">

				<div id="npc-template" class="dna-template stat-block inactive" data-movable="~~movable~~" data-index="~~index~~">

					<menu class="toolbar">
						<button class="btn btn-default edit glyphicon glyphicon-pencil"></button>
						<button class="btn btn-default validate glyphicon glyphicon-ok hidden"></button>
						<button class="btn btn-default cancel glyphicon glyphicon-remove hidden"></button>
						<button class="btn btn-default remove glyphicon glyphicon-trash"></button>
					</menu>

					<div>
						<div class="name uneditable">
							~~name~~
						</div>

						<label class=" editable hidden">
							<span>Name:</span>
							<input type="text" class="name-input" value="~~name~~" />
						</label>

						<div class="uneditable">
							~~description~~
						</div>

						<label class="editable hidden">
							<span>Tags:</span>
							<input type="text" class="description-input" value="~~description~~" />
						</label>

						<div class="uneditable">
							~~visual~~
						</div>

						<label class="editable hidden">
							<span>Description:</span>
							<textarea class="visual-input">~~visual~~</textarea>
						</label>
					</div>

					<div class="red">

						<div>
							<span class="main-stat uneditable">Level</span> <span class="uneditable">
								~~level~~
							</span>

							<label class="editable hidden">
								<span class="main-stat">Level:</span>
								<input type="number" min="0" step="1" class="level-input" value="~~level~~" />
							</label>
						</div>

						<div>
							<span class="main-stat uneditable">Alignment</span> <span class="uneditable">
								~~alignment~~
							</span>

							<label class="editable hidden">
								<span class="main-stat">Alignment:</span>
								<input type="text" class="alignment-input" value="~~alignment~~" />
							</label>
						</div>

						<div>
							<span class="main-stat uneditable">Armor Class</span> <span class="uneditable">
								~~ac~~
							</span>

							<label class="editable hidden">
								<span class="main-stat">Armor Class:</span>
								<input type="number" min="0" step="1" class="ac-input" value="~~ac~~" />
							</label>
						</div>

						<div>
							<span class="main-stat uneditable">Hit Points</span> <span class="uneditable">
								~~hitpoints~~
							</span>

							<label class="editable hidden">
								<span class="main-stat">Hit Points</span>
								<input type="number" min="0" step="1" class="hp-input" value="~~hitpoints~~" />
							</label>
						</div>

						<div>
							<span class="main-stat uneditable">Speed</span> <span class="uneditable">~~speed~~</span><span class="uneditable"> ft.</span>

							<label class="editable hidden">
								<span class="main-stat">Speed:</span>
								<input type="number" min="1" step="1" class="speed-input" value="~~speed~~" />
								 ft.
							</label>
						</div>
					</div>

					<table>
						<tr>
							<th>STR</th>
							<th>DEX</th>
							<th>CON</th>
							<th>INT</th>
							<th>WIS</th>
							<th>CHA</th>
						</tr>

						<tr class="uneditable">
							<td>
								<span>
									~~str~~
								</span>
								(<span>~~strm~~</span>)
							</td>

							<td>
								<span>
									~~dex~~
								</span>
								(<span>~~dexm~~</span>)
							</td>

							<td>
								<span>
									~~con~~
								</span>
								(<span>~~conm~~</span>)
							</td>

							<td>
								<span>
									~~int~~
								</span>
								(<span>~~intm~~</span>)
							</td>

							<td>
								<span>
									~~wis~~
								</span>
								(<span>~~wism~~</span>)
							</td>

							<td>
								<span>
									~~cha~~
								</span>
								(<span>~~cham~~</span>)
							</td>
						</tr>

						<tr class="editable hidden">
							<td>
								<input type="number" min="0" step="1" class="str-input editable hidden" value="~~str~~" />
							</td>

							<td>
								<input type="number" min="0" step="1" class="dex-input editable hidden" value="~~dex~~" />
							</td>

							<td>
								<input type="number" min="0" step="1" class="con-input editable hidden" value="~~con~~" />
							</td>

							<td>
								<input type="number" min="0" step="1" class="int-input editable hidden" value="~~int~~" />
							</td>

							<td>
								<input type="number" min="0" step="1" class="wis-input editable hidden" value="~~wis~~" />
							</td>

							<td>
								<input type="number" min="0" step="1" class="cha-input editable hidden" value="~~cha~~" />
							</td>
						</tr>
					</table>

					<div>
						<div>
							<span class="secondary-stat uneditable">Senses</span>
							<span class="uneditable">Passive Perception</span>
							<span class="perception uneditable">~~perception~~</span>

							<label class="editable hidden">
								<span class="secondary-stat">Passive Perception:</span>
								<input type="number" class="perception-input" value="~~perception~~" />
							</label>
						</div>

						<div>
							<span class="secondary-stat uneditable">Languages</span>
							<span class="languages uneditable">~~languages~~</span>

							<label class="editable hidden">
								<span class="secondary-stat">Languages:</span>
								<input type="text" class="languages-input" value="~~languages~~" />
							</label>
						</div>

						<div>
							<span class="secondary-stat uneditable">Challenge</span>
							<span class="uneditable"><span>~~challenge~~</span> (<span>~~xp~~</span> XP)</span>

							<label class="editable hidden">
								<span class="secondary-stat">Challenge:</span>
								<input type="number" min="1" step="1" class="challenge-input" value="~~challenge~~" />
								( <input type="number" min="1" step="1" class="xp-input" value="~~xp~~" /> XP)
							</label>
						</div>
					</div>
				</div>
			</div>

			<div id="modal">

				<div id="login">
					<span class="modal-title">Login</span>
					<span>
						<label for="login-nickname">Nickname:</label>
						<input id="login-nickname" type="text" />
					</span>

					<span>
						<label for="login-password">Password:</label>
						<input id="login-password" type="password" />
					</span>

					<div class="btn-group">
						<button id="mod-signup" type="button" class="btn btn-default">Sign up</button>
						<button id="mod-login" type="button" class="btn btn-default">Login</button>
					</div>
					<span class="close-modal glyphicon glyphicon-remove" title="Close"></span>

				</div>

				<div id="save">
					<span class="modal-title">Save your list</span>
					<span>
						<label for="save-name">List name:</label>
						<input id="save-name" type="text" />
					</span>

					<button id="mod-save" type="button" class="btn btn-default">Save</button>
					<span class="close-modal glyphicon glyphicon-remove" title="Close"></span>
				</div>

				<div id="load">
					<span class="modal-title">Choose a list</span>
					<span>
						<label for="load-list">Lists:</label>
						<select id="load-list">
						</select>
						<button class="btn btn-default delete glyphicon glyphicon-trash"></button>
					</span>

					<button id="mod-load" type="button" class="btn btn-default">Load</button>
					<span class="close-modal glyphicon glyphicon-remove" title="Close"></span>
				</div>

				<div id="adduser">
					<span class="modal-title">Sign up</span>
					<span>
						<label for="adduser-nickname">Nickname:</label>
						<input id="adduser-nickname" type="text" />
					</span>

					<span>
						<label for="adduser-password">Password:</label>
						<input id="adduser-password" type="password" />
					</span>

					<button id="mod-adduser" type="button" class="btn btn-default">Register</button>
					<span class="close-modal glyphicon glyphicon-remove" title="Close"></span>
				</div>

			</div>


			<span id="notification"></span>

		</div>

		<!-- SCRIPTS -->
		<script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
		<script>
			if (typeof jQuery == 'undefined') {
			    document.write(unescape("%3Cscript src='./js/jquery-1.11.0.min.js' type='text/javascript'%3E%3C/script%3E"));
			}
			</script>
		<script type="text/javascript" src="./js/dna.min.js"></script>
		<script type="text/javascript" src="./js/hammer.min.js"></script>
		<script type="text/javascript" src="./js/jquery.hammer.js"></script>
		<script type="text/javascript" src="./js/Utils.js"></script>
		<script type="text/javascript" src="./js/Inkubator.js"></script>
		<script type="text/javascript" src="./js/ux.js"></script>
		<script type="text/javascript" src="./js/script.js"></script>
	</body>
</html>
