function error(status, msg) {
	var err = new Error(msg);
	err.status = status;
	return err;
}

export {error}
