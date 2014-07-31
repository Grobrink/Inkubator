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

				<div id="npc-template" class="dna-template stat-block inactive">
					<div>
						<div class="name">
							~~name~~
						</div>

						<div>
							~~description~~
						</div>

						<div>
							~~visual~~
						</div>
					</div>

					<div class="red">

						<div>
							<span class="bold red">Level</span> <span>
								~~level~~
							</span>
						</div>

						<div>
							<span class="bold red">Alignment</span> <span>
								~~alignment~~
							</span>
						</div>

						<div>
							<span class="bold red">Armor Class</span> <span>
								~~armor~~
							</span>
						</div>

						<div>
							<span class="bold red">Hit Points
								<span>
									~~hitpoints~~
								</span>
							</span>
						</div>

						<div>
							<span class="bold red">Speed</span> <span>30 ft.</span>
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

						<tr>
							<td><span>
									~~str~~
								</span>
								(<span>~~strm~~</span>)
							</td>
							<td><span>
									~~dex~~
								</span>
								(<span>~~dexm~~</span>)
							</td>
							<td><span>
									~~con~~
								</span>
								(<span>~~conm~~</span>)
							</td>
							<td><span>
									~~int~~
								</span>
								(<span>~~intm~~</span>)
							</td>
							<td><span>
									~~wis~~
								</span>
								(<span>~~wism~~</span>)
							</td>
							<td><span>
									~~cha~~
								</span>
								(<span>~~cham~~</span>)
							</td>
						</tr>
					</table>

					<div>
						<div>
							<span class="bold">Senses</span>
							Passive Perception <span class="perception">~~perception~~</span>
						</div>

						<div>
							<span class="bold">Languages</span>
							<span class="languages">~~languages~~</span>
						</div>

						<div>
							<span class="bold">Challenge</span>
							<span>1 (120 XP)</span>
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
